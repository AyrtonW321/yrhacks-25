import cv2
from pyzbar.pyzbar import decode
import numpy as np
import collections
import os

# Smoothing and persistence config
BOX_HISTORY_LENGTH = 5
MIN_CONSISTENT_DETECTIONS = 2
MAX_MISSED_FRAMES = 5

# Setting
CONFIRMATION_THRESHOLD = 3

# Track detection history
box_history = collections.defaultdict(lambda: collections.deque(maxlen=BOX_HISTORY_LENGTH))
last_seen_frame = {}
frame_count = 0

# Track barcode confidence
barcode_confidence = collections.defaultdict(int)
confirmed_barcodes = set()

# Folder to save screenshots (inside public -> dataset)
public_folder = "public"
screenshot_folder = os.path.join(public_folder, "screenshot")

# Create the 'public/dataset' folder if it doesn't exist
if not os.path.exists(screenshot_folder):
    os.makedirs(screenshot_folder)

def draw_product_box(frame, barcode_data, avg_box, expansion_ratio=3.0):
    try:
        x, y, w, h = avg_box

        # Calculate expansion
        expand_w = w * (expansion_ratio - 1) / 2
        expand_h = h * (expansion_ratio - 1) / 2

        frame_height, frame_width = frame.shape[:2]
        new_x = max(0, int(x - expand_w))
        new_y = max(0, int(y - expand_h))
        new_w = min(frame_width - new_x, int(w * expansion_ratio))
        new_h = min(frame_height - new_y, int(h * expansion_ratio))

        # Draw box
        cv2.rectangle(frame,
                     (new_x, new_y),
                     (new_x + new_w, new_y + new_h),
                     (0, 255, 0), 2)

        # Label
        label = f"Product: {barcode_data}"
        (text_width, text_height), _ = cv2.getTextSize(label, cv2.FONT_HERSHEY_SIMPLEX, 0.7, 2)
        cv2.rectangle(frame,
                     (new_x, new_y - text_height - 10),
                     (new_x + text_width + 10, new_y),
                     (0, 255, 0), -1)
        cv2.putText(frame, label, (new_x + 5, new_y - 5),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 0, 0), 2)

    except Exception as e:
        print(f"Error drawing box: {str(e)}")

def save_screenshot(frame, barcode_data):
    try:
        # Generate a filename based on the barcode data
        filename = os.path.join(screenshot_folder, f"{barcode_data}.jpg")
        
        # Check if the file already exists
        if os.path.exists(filename):
            print(f"Screenshot already exists: {filename}")
            return True  # File already exists, no need to save

        # Save the screenshot
        cv2.imwrite(filename, frame)
        print(f"Saved screenshot: {filename}")
        return False
    except Exception as e:
        print(f"Error saving screenshot: {str(e)}")
        return False

def main():
    global frame_count
    cap = cv2.VideoCapture(0)
    cap.set(cv2.CAP_PROP_FRAME_WIDTH, 1280)
    cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 720)
    cap.set(cv2.CAP_PROP_AUTOFOCUS, 0)
    cap.set(cv2.CAP_PROP_BUFFERSIZE, 1)

    if not cap.isOpened():
        print("Error: Could not open webcam.")
        return

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame = cv2.flip(frame, 1)
        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        blurred = cv2.GaussianBlur(gray, (3, 3), 0)
        clahe = cv2.createCLAHE(clipLimit=2.0, tileGridSize=(8, 8))
        enhanced = clahe.apply(blurred)
        thresh = cv2.adaptiveThreshold(enhanced, 255,
            cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

        decoded_objects = decode(thresh) or decode(enhanced) or decode(gray)
        detected_now = set()

        for obj in decoded_objects:
            barcode_data = obj.data.decode("utf-8")

            x, y, w, h = obj.rect
            box_history[barcode_data].append((x, y, w, h))
            last_seen_frame[barcode_data] = frame_count

            # Confidence logic
            barcode_confidence[barcode_data] += 1
            if barcode_confidence[barcode_data] >= CONFIRMATION_THRESHOLD:
                confirmed_barcodes.add(barcode_data)

                # Save screenshot when barcode is confirmed
                save_screenshot(frame, barcode_data)

                # Close the camera after barcode is found
                cap.release()
                cv2.destroyAllWindows()
                return
        
        # Every N frames, remove stale data
        if frame_count % 100 == 0:
            expired = [b for b, f in last_seen_frame.items() if frame_count - f > MAX_MISSED_FRAMES]
            for b in expired:
                box_history.pop(b, None)
                last_seen_frame.pop(b, None)
                confirmed_barcodes.discard(b)
                barcode_confidence.pop(b, None)

        # Draw only confirmed or recently seen barcodes
        for barcode_data, boxes in box_history.items():
            recently_seen = (frame_count - last_seen_frame.get(barcode_data, 0)) <= MAX_MISSED_FRAMES
            if barcode_data in confirmed_barcodes or recently_seen:
                if len(boxes) >= MIN_CONSISTENT_DETECTIONS:
                    avg_box = np.mean(boxes, axis=0).astype(int)
                    draw_product_box(frame, barcode_data, avg_box, expansion_ratio=1.5)
        
        cv2.imshow('Barcode Reader', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

        frame_count += 1

    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
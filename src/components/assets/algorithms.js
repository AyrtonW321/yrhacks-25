"use strict";
// constains all structures
// node structure for linkedlist
// double linked node
export class node {
    // auto take value
    constructor(val, index) {
        this.val = val;
        this.index = index;
        this.next = null;
        this.prev = null;
    }
}
// TO USE
// Create the class (dataarray)
// returns sorted data array in index form
export class MergeSortLL {
    // construct linked list given data
    // takes O(n) time
    constructor(arr) {
        // since in merge sort split we aren't able to split an array down the middle unless we copy all previous elements
        // by using a linked link i can have a pointer towards the middle and just cut it in half
        // this way the split function becomes O(n/2) time instead of O(n)
        // also solves the push issue being O(n) because I can just push to the tail making it O(1)
        this.head = null;
        this.tail = null;
        this.numElements = 0;
        for (let i = 0; i < arr.length; i++) {
            // Create a new node
            let newNode = new node(arr[i], i);            
            // Check if the list is empty
            if (this.head === null) {
                // If the list is empty, set both head and tail to the new node
                this.head = newNode;
                this.tail = newNode;
                this.numElements++;
            } else {
                // If the list is not empty, link the last node (tail) to the new node
                this.tail.next = newNode;
                this.tail = newNode;  // Update tail to point to the new node
                this.numElements++;
            }
        }
    }
    // get size
    size() {
        return this.numElements;
    }
    // Merge Sort
    // start with the head
    // cut it half until base case, 1 element
    // this way we can recombine them from the bottom up using O(1) opperation each time
    mergeSort(head) {
        // base case
        // when the head is null means the split was uneven
        // when next is null it is a 1 item list
        if (!head || !head.next)
            return head;
        // split
        // contains the start to middle
        let middle = this.getMiddle(head);
        // contains middle to end
        let nextOfMiddle = middle.next;
        // Break the list into two halves
        middle.next = null;
        // split into left and right side linkedlists using the head
        let left = this.mergeSort(head);
        let right = this.mergeSort(nextOfMiddle);
        // merge
        return this.sortedMerge(left, right);
    }
    // find middle
    getMiddle(node) {
        if (!node)
            return node;
        let slow = node;
        let fast = node;
        // since fast goes by 2 it goes to the end 2 times faster
        // therefore since slow goes by 1 it will reach the middle
        // O(n/2) to traverse
        while (fast.next !== null && fast.next.next !== null) {
            // if fast isnt null slow can't be either
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
    // Merge 
    // Merging the arrays together after they have been cut down to 1 piece
    sortedMerge(left, right) {
        // depending on compare we add that element to the sorted and increment the index
        // this compares every element to the other side, but since it is already sorted we don't have to compare with itself
        // maximum comparisions in a loop is n/2
        let result = null;
        let resultTail = null;
        while (left !== null && right !== null) {
            let newNode;
            // COMPARISON
            if (this.compare(left.val, right.val) === 1) {
                newNode = new node(left.val, left.index);
                left = left.next;
            }
            else {
                newNode = new node(right.val, right.index);
                right = right.next;
            }
            // no head
            if (result === null) {
                result = newNode;
                resultTail = newNode;
            }
            // has head
            else if (resultTail !== null) {
                resultTail.next = newNode;
                resultTail = newNode;
            }
        }
        let remaining = (left !== null) ? left : right;
        if (resultTail !== null) {
            resultTail.next = remaining;
        }
        return result;
    }
    // sort the stuff
    // returns an array of sorted indexes
    sort(compare) {
        // if no compare function just do ascending
        if (typeof compare !== 'function')
            this.compare = compareAlphaAscending;
        else
            this.compare = compare;
        let arr = new Array;
        let cur = this.mergeSort(this.head);
        // O(n) to convert back to list
        for (let i = 0; i < this.numElements; i++) {
            arr.push(cur.index)
            if (cur.next !== null) {
                cur = cur.next;
            }
        }
        return arr;
    }
}

export function binarySearch(target, data, compareFn) {
    let left = 0;
    let right = data.length - 1;
    let foundIndexes = [];
    let foundIndex = -1;
    if (typeof compareFn !== 'function') {
        return [-1];
    }
    while (left <= right) {
        // find middle index
        const midIndex = Math.floor((left + right) / 2);
        // store the return value of the compare function
        const compareResult = compareFn(target, data[midIndex]);
        // if the target was found at the midIndex, set the foundIndex to midIndex
        if (compareResult === 0) {
            foundIndex = midIndex;
            break;
        }
        // if the middle val was too large, decrease right
        else if (compareResult < 0) {
            right = midIndex - 1;
        }
        // if the middle val was too small, increase left
        else {
            left = midIndex + 1;
        }
    }
    if (foundIndex === -1) {
        return [-1];
    }
    foundIndexes.push(foundIndex);
    let i = foundIndex - 1;
    while (i >= 0 && compareFn(target, data[i]) === 0) {
        foundIndexes.push(i);
        i--;
    }
    let j = foundIndex + 1;
    while (j <= data.length && compareFn(target, data[j]) === 0) {
        foundIndexes.push(j);
        j++;
    }
    return foundIndexes;
}

// utility functions
// converts indexes to a data set based on order
// so if [1, 3, 2, 4]
// it will return the data value of [data[1], data[3], data[2], data[4]]
export function indexToData(indexes, arr) {
    let result = new Array(indexes.length);
    for (let i = 0; i < indexes.length; i++) {
        result[i] = arr[indexes[i]];
    }
    return result;
}

export function compareAlphaAscending(target, mid) {
    const len = Math.min(target.length, mid.length);
    let a = target.toLowerCase();
    let b = mid.toLowerCase();
    let count = 0;
    for (let i = 0; i < len; i++) {
        let aVal = a.charCodeAt(i);
        let bVal = b.charCodeAt(i);
        if (aVal === bVal) {
            count++;
        }
        else if (aVal < bVal) {
            return -1;
        }
        else {
            return 1;
        }
    }
    return 0;
}
export function compareAlphaDescending(target, mid) {
    const len = Math.min(target.length, mid.length);
    let a = target.toLowerCase();
    let b = mid.toLowerCase();
    let count = 0;
    for (let i = 0; i < len; i++) {
        let aVal = a.charCodeAt(i);
        let bVal = b.charCodeAt(i);
        if (aVal === bVal) {
            count++;
        }
        else if (aVal > bVal) {
            return -1;
        }
        else {
            return 1;
        }
    }
    return 0;
}


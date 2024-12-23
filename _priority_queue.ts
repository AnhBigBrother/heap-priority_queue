type HeapItem<T> = {
	value: T
	priority: number
}

class PriorityQueue<T> {
	private heap: HeapItem<T>[]
	private compare: (parent: number, child: number) => number

	constructor(compareFunc: (parent: number, child: number) => number) {
		this.heap = []
		this.compare = compareFunc
	}

	private heapUp = (idx: number) => {
		if (idx === 0) return
		let parent_idx = Math.floor((idx - 1) / 2)
		if (this.compare(this.heap[parent_idx].priority, this.heap[idx].priority) < 0) {
			;[this.heap[parent_idx], this.heap[idx]] = [this.heap[idx], this.heap[parent_idx]]
			this.heapUp(parent_idx)
		}
	}
	private heapDown = (idx: number) => {
		let swap_child_idx = 2 * idx + 1
		if (swap_child_idx >= this.heap.length) return
		if (
			2 * idx + 2 < this.heap.length &&
			this.compare(this.heap[swap_child_idx].priority, this.heap[2 * idx + 2].priority) < 0
		) {
			swap_child_idx = 2 * idx + 2
		}
		if (this.compare(this.heap[idx].priority, this.heap[swap_child_idx].priority) < 0) {
			;[this.heap[idx], this.heap[swap_child_idx]] = [this.heap[swap_child_idx], this.heap[idx]]
			this.heapDown(swap_child_idx)
		}
	}

	top = () => {
		if (this.heap.length === 0) {
			return Error("Heap is empty!")
		}
		return this.heap[0]
	}
	push = (value: T, priority: number) => {
		this.heap.push({ value, priority })
		this.heapUp(this.heap.length - 1)
	}
	pop = () => {
		if (this.heap.length === 0) {
			return Error("Heap is empty!")
		}
		const res = this.heap[0]
		;[this.heap[0], this.heap[this.heap.length - 1]] = [
			this.heap[this.heap.length - 1],
			this.heap[0],
		]
		this.heap.pop()
		this.heapDown(0)
		return res
	}
	length = () => {
		return this.heap.length
	}
	updateByIndex = (idx: number, value: T, priority?: number) => {
		if (!priority || this.heap[idx].priority === priority) {
			this.heap[idx].value = value
			return
		}
		if (this.compare(priority, this.heap[idx].priority) > 0) {
			this.heap[idx] = { value, priority }
			this.heapUp(idx)
		} else {
			this.heap[idx] = { value, priority }
			this.heapDown(idx)
		}
	}
	updateByValue = (old_val: T, new_val: T, new_priority?: number) => {
		for (let i = 0; i < this.heap.length; i++) {
			if (this.heap[i].value === old_val) {
				this.updateByIndex(i, new_val, new_priority)
				return
			}
		}
	}
}

export { PriorityQueue }

#!/usr/bin/env python3
"""
Module that implements task_wait_n using task_wait_random.
"""
import asyncio
from typing import List

task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawns task_wait_random n times and returns the delays in ascending order.
    """
    # Create the list of tasks using the Task creator from Task 3
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    delays = []

    # Use as_completed to ensure the list is built by completion time
    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)

    return delays

#!/usr/bin/env python3
"""
Module for executing multiple tasks at the same time using task_wait_random.
"""
import asyncio
from typing import List

# Importing the necessary functions
task_wait_random = __import__('3-tasks').task_wait_random


async def task_wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawns task_wait_random n times with the specified max_delay.
    
    Args:
        n (int): Number of tasks to spawn.
        max_delay (int): Maximum delay for each task.
        
    Returns:
        List[float]: List of all delays in ascending order.
    """
    # Create a list of n Task objects using the task_wait_random function
    tasks = [task_wait_random(max_delay) for _ in range(n)]
    
    # Use as_completed to yield tasks as they finish
    delays = []
    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)
        
    return delays

#!/usr/bin/env python3
"""
Module for executing multiple coroutines at the same time with async.
"""
import asyncio
from typing import List

# Importing wait_random from the previous file
wait_random = __import__('0-basic_async_syntax').wait_random


async def wait_n(n: int, max_delay: int) -> List[float]:
    """
    Spawns wait_random n times with the specified max_delay.
    
    Args:
        n (int): The number of times to spawn wait_random.
        max_delay (int): The maximum delay for each wait_random call.
        
    Returns:
        List[float]: A list of all delays in ascending order.
    """
    delays = []
    # Create a list of n coroutine tasks
    tasks = [wait_random(max_delay) for _ in range(n)]
    
    # use as_completed to get values as they finish (ascending order)
    for task in asyncio.as_completed(tasks):
        delay = await task
        delays.append(delay)
        
    return delays

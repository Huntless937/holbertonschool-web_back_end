#!/usr/bin/env python3
"""
Module for asynchronous coroutine that waits for a random delay.
"""
import asyncio
import random


async def wait_random(max_delay: int = 10) -> float:
    """
    Asynchronous coroutine that waits for a random delay between 0 and 
    max_delay (included) seconds and eventually returns it.
    
    Args:
        max_delay (int): The upper bound of the random delay. Defaults to 10.
        
    Returns:
        float: The actual delay time spent waiting.
    """
    delay = random.uniform(0, max_delay)
    await asyncio.sleep(delay)
    return delay

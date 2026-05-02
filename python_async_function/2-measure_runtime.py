#!/usr/bin/env python3
"""
Module for measuring the execution time of wait_n.
"""
import asyncio
import time

# Importing wait_n from the previous file
wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Measures the total execution time for wait_n(n, max_delay) 
    and returns total_time / n.
    
    Args:
        n (int): Number of coroutines to spawn.
        max_delay (int): Maximum delay for each coroutine.
        
    Returns:
        float: Average time per iteration (total_time / n).
    """
    start_time = time.perf_counter()
    
    # Execute the async function
    asyncio.run(wait_n(n, max_delay))
    
    end_time = time.perf_counter()
    
    total_time = end_time - start_time
    return total_time

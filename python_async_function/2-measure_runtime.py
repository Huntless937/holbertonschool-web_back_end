#!/usr/bin/env python3
"""
Module to measure the runtime of the wait_n coroutine.
"""
import asyncio
import time

wait_n = __import__('1-concurrent_coroutines').wait_n


def measure_time(n: int, max_delay: int) -> float:
    """
    Computes the average execution time for wait_n given n and max_delay.
    """
    start_time = time.perf_counter()
    asyncio.run(wait_n(n, max_delay))
    end_time = time.perf_counter()

    return (end_time - start_time)

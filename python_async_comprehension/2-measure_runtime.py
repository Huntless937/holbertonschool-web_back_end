#!/usr/bin/env python3
"""
Dörd daxili tapşırığın paralel icrasını ölçmək
"""
import asyncio
import time

# Əvvəlki tapşırıqdan async_comprehension-u import edirik
async_comprehension = __import__('1-async_comprehension').async_comprehension


async def measure_runtime() -> float:
    """
    async_comprehension-u 4 dəfə paralel işlədir və ümumi vaxtı ölçür
    """
    start_time = time.perf_counter()

    # asyncio.gather istifadə edərək 4 tapşırığı eyni anda başladırıq
    await asyncio.gather(*(async_comprehension() for _ in range(4)))

    end_time = time.perf_counter()
    return end_time - start_time

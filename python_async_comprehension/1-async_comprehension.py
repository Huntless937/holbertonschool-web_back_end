#!/usr/bin/env python3
"""
Async comprehension tapşırığı
"""
import asyncio
from typing import List

# Əvvəlki tapşırıqdan async_generator-u import edirik
async_generator = __import__('0-async_generator').async_generator


async def async_comprehension() -> List[float]:
    """
    Async generator üzərində dövr edir və 10 təsadüfi rəqəmi 
    list comprehension vasitəsilə toplayır.
    """
    return [i async for i in async_generator()]

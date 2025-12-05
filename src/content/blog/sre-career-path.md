---
title: 'From Data Center Tech to SRE: My Career Journey'
excerpt: 'How I transitioned from hands-on hardware work to site reliability engineering at Google.'
tags: ['Career', 'SRE', 'Personal', 'Google']
date: 2024-03-10
readTime: '5 min'
featured: false
---

The path to Site Reliability Engineering isn't always linear. Mine certainly wasn't.

## Starting Point: US Navy

My journey began as an Electrical Maintenance Technician (Nuclear) in the US Navy. This experience taught me:

- Rigorous attention to detail
- Systems thinking under pressure
- The importance of _documentation_ and _checklists_

> "The nuclear Navy taught me that every procedure exists because something went wrong before."

## The Data Center Years

At Google, I started as a Data Center Technician. Over 8 years, I:

- Commissioned 3 data centers (400MW+ total)
- Developed automation for SCADA systems
- Built tools that saved **400K+ labor hours** annually

Here's an example of the kind of Python automation I wrote for SCADA monitoring:

```python
import asyncio
from dataclasses import dataclass
from typing import List

@dataclass
class SensorReading:
    sensor_id: str
    value: float
    timestamp: float

class ScadaMonitor:
    def __init__(self, sensors: List[str]):
        self.sensors = sensors
        self.alert_threshold = 0.95

    async def check_sensor(self, sensor_id: str) -> SensorReading:
        # Poll sensor and return reading
        reading = await self._poll_sensor(sensor_id)
        if reading.value > self.alert_threshold:
            await self._trigger_alert(reading)
        return reading

    async def monitor_loop(self):
        while True:
            tasks = [self.check_sensor(s) for s in self.sensors]
            await asyncio.gather(*tasks)
            await asyncio.sleep(60)
```

## The Transition

The key to transitioning from DCT to SRE was demonstrating software engineering skills while solving operations problems. My SCADA automation projects proved I could write production code while maintaining operational excellence.

### What Helped Most

1. **Internal courses**: Google's SRE training program
2. **Side projects**: Building monitoring dashboards
3. **Mentorship**: Finding sponsors who believed in my potential

## Lessons Learned

1. **Build Things**: Side projects and automation demonstrate capability
2. **Document Everything**: Your work should speak for itself
3. **Find Sponsors**: Mentors who advocate for your growth are invaluable
4. **Stay Curious**: The technology changes; the learning never stops

If you're interested in the SRE path, I recommend reading the [Google SRE Book](https://sre.google/sre-book/table-of-contents/)—it's available free online.

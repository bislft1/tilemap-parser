"""
Tests for ParticleEmitter behavior — spawn_rate and manual emission.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

import pytest

from tilemap_parser.parser.particle import ParticleSystemConfig
from tilemap_parser.runtime.particles import ParticleEmitter


class TestParticleEmitterSpawnRate:
    def test_spawn_rate_zero_prevents_auto_spawn(self):
        """With spawn_rate=0, update() never auto-spawns particles."""
        config = ParticleSystemConfig(
            name="test",
            spawn_rate=0,
            max_particles=100,
            speed_min=10,
            speed_max=100,
            lifetime_min=0.5,
            lifetime_max=2.0,
        )
        emitter = ParticleEmitter(config)

        for _ in range(100):
            emitter.update(0.016, 0, 0, 100, 100)

        assert len(emitter.particles) == 0

    def test_emit_burst_still_works_with_spawn_rate_zero(self):
        """emit_burst() creates particles regardless of spawn_rate=0."""
        config = ParticleSystemConfig(
            name="test",
            spawn_rate=0,
            max_particles=100,
            speed_min=10,
            speed_max=100,
            lifetime_min=0.5,
            lifetime_max=2.0,
        )
        emitter = ParticleEmitter(config)

        emitter.emit_burst(5, 0, 0, 100, 100)

        assert len(emitter.particles) == 5

    def test_spawn_rate_zero_particles_die_naturally(self):
        """Particles created via emit_burst with spawn_rate=0 live and die.

        After burst, particles exist. After their max lifetime passes,
        all are gone and the emitter returns to zero.
        """
        config = ParticleSystemConfig(
            name="test",
            spawn_rate=0,
            max_particles=100,
            speed_min=0,
            speed_max=0,
            lifetime_min=0.5,
            lifetime_max=0.5,
        )
        emitter = ParticleEmitter(config)

        emitter.emit_burst(3, 0, 0, 100, 100)
        assert len(emitter.particles) == 3

        for _ in range(30):
            emitter.update(0.05, 0, 0, 100, 100)
        assert len(emitter.particles) == 0

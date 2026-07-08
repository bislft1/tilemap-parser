import math
import sys
import time
from typing import Dict, List, Optional, Tuple

import pygame
from pygame import Surface

from tilemap_parser.parser.particle import ParticleSystemConfig
from tilemap_parser.runtime.particles import (
    Particle,
    ParticleSystem,
    ParticleRenderer,
)


SCREEN_W, SCREEN_H = 1000, 700
FPS = 60
ZOOM = 1.0

COLOR_BG = (15, 15, 22)
COLOR_MODE_NAIVE = (255, 140, 140)
COLOR_MODE_CACHED = (140, 255, 140)

_COLOR_QUANT = 16
_SIZE_QUANT = 8


def _quantize_color(c: Tuple[int, int, int, int]) -> Tuple[int, int, int, int]:
    q = _COLOR_QUANT
    half = q // 2
    return (
        min(255, (c[0] + half) // q * q),
        min(255, (c[1] + half) // q * q),
        min(255, (c[2] + half) // q * q),
        min(255, (c[3] + half) // q * q),
    )


def _render_particle(shape: str, size: int, color: Tuple[int, int, int, int]) -> Surface:
    d = size * 2
    surf = pygame.Surface((d, d), pygame.SRCALPHA)
    if shape == "circle":
        pygame.draw.circle(surf, color, (size, size), size)
    elif shape == "diamond":
        pts = [(size, 0), (d, size), (size, d), (0, size)]
        pygame.draw.polygon(surf, color, pts)
    elif shape == "star":
        cx = cy = size
        pts = []
        for i in range(8):
            a = math.pi * 2 * i / 8 - math.pi / 2
            r = size - 2 if i % 2 == 0 else (size - 2) * 0.4
            pts.append((cx + r * math.cos(a), cy + r * math.sin(a)))
        pygame.draw.polygon(surf, color, pts)
    elif shape == "heart":
        cx, cy = size, size
        pts = []
        for i in range(60):
            t = math.pi * 2 * i / 60
            x = 16 * math.sin(t) ** 3
            y = 13 * math.cos(t) - 5 * math.cos(2 * t) - 2 * math.cos(3 * t) - math.cos(4 * t)
            pts.append((cx + x * 0.7, cy - y * 0.7))
        pygame.draw.polygon(surf, color, pts)
    else:
        pygame.draw.circle(surf, color, (size, size), size)
    return surf




PRESETS = [
    {
        "name": "Bonfire",
        "x": 80, "y": SCREEN_H - 60, "w": 60, "h": 20,
        "config": {
            "emission_shape": "point",
            "particle_shape": "circle",
            "particle_size_min": 3, "particle_size_max": 9,
            "spawn_rate": 400, "max_particles": 1600,
            "lifetime_min": 0.3, "lifetime_max": 1.2,
            "speed_min": 40, "speed_max": 100,
            "direction": 270, "spread": 30,
            "gravity_x": 0, "gravity_y": -18,
            "start_color_r": 255, "start_color_g": 200, "start_color_b": 60, "start_color_a": 255,
            "end_color_r": 180, "end_color_g": 40, "end_color_b": 10, "end_color_a": 0,
            "start_scale": 1.0, "end_scale": 0.2,
            "rotation_speed": 0, "alpha_fade": "fade_out",
        },
    },
    {
        "name": "Geyser",
        "x": 280, "y": SCREEN_H - 60, "w": 40, "h": 15,
        "config": {
            "emission_shape": "point",
            "particle_shape": "star",
            "particle_size_min": 4, "particle_size_max": 10,
            "spawn_rate": 600, "max_particles": 2000,
            "lifetime_min": 0.5, "lifetime_max": 2.0,
            "speed_min": 140, "speed_max": 320,
            "direction": 270, "spread": 18,
            "gravity_x": 0, "gravity_y": -8,
            "start_color_r": 100, "start_color_g": 220, "start_color_b": 255, "start_color_a": 255,
            "end_color_r": 255, "end_color_g": 255, "end_color_b": 255, "end_color_a": 0,
            "start_scale": 1.0, "end_scale": 0.3,
            "rotation_speed": 200, "alpha_fade": "fade_out",
        },
    },
    {
        "name": "Hearts",
        "x": 480, "y": SCREEN_H - 60, "w": 50, "h": 15,
        "config": {
            "emission_shape": "point",
            "particle_shape": "heart",
            "particle_size_min": 3, "particle_size_max": 7,
            "spawn_rate": 500, "max_particles": 1600,
            "lifetime_min": 0.8, "lifetime_max": 2.0,
            "speed_min": 60, "speed_max": 180,
            "direction": 270, "spread": 35,
            "gravity_x": 0, "gravity_y": -8,
            "start_color_r": 255, "start_color_g": 100, "start_color_b": 150, "start_color_a": 255,
            "end_color_r": 255, "end_color_g": 200, "end_color_b": 50, "end_color_a": 0,
            "start_scale": 1.0, "end_scale": 0.3,
            "rotation_speed": 150, "alpha_fade": "fade_out",
        },
    },
    {
        "name": "Smoke",
        "x": 680, "y": SCREEN_H - 60, "w": 100, "h": 40,
        "config": {
            "emission_shape": "rect",
            "particle_shape": "circle",
            "particle_size_min": 14, "particle_size_max": 34,
            "spawn_rate": 200, "max_particles": 800,
            "lifetime_min": 1.5, "lifetime_max": 4.0,
            "speed_min": 20, "speed_max": 50,
            "direction": 270, "spread": 45,
            "gravity_x": 0, "gravity_y": -5,
            "start_color_r": 160, "start_color_g": 160, "start_color_b": 170, "start_color_a": 100,
            "end_color_r": 60, "end_color_g": 60, "end_color_b": 80, "end_color_a": 0,
            "start_scale": 0.5, "end_scale": 2.5,
            "rotation_speed": 0, "alpha_fade": "fade_out",
        },
    },
    {
        "name": "Diamonds",
        "x": SCREEN_W // 2, "y": 80, "w": 300, "h": 120,
        "config": {
            "emission_shape": "rect",
            "particle_shape": "diamond",
            "particle_size_min": 3, "particle_size_max": 6,
            "spawn_rate": 800, "max_particles": 2000,
            "lifetime_min": 0.4, "lifetime_max": 1.2,
            "speed_min": 80, "speed_max": 220,
            "direction": 90, "spread": 50,
            "gravity_x": 0, "gravity_y": 20,
            "start_color_r": 255, "start_color_g": 255, "start_color_b": 80, "start_color_a": 255,
            "end_color_r": 255, "end_color_g": 80, "end_color_b": 0, "end_color_a": 0,
            "start_scale": 1.0, "end_scale": 0.2,
            "rotation_speed": 300, "alpha_fade": "fade_out",
        },
    },
    {
        "name": "Rain",
        "x": 80, "y": 0, "w": SCREEN_W - 160, "h": 10,
        "config": {
            "emission_shape": "rect",
            "particle_shape": "circle",
            "particle_size_min": 1, "particle_size_max": 2,
            "spawn_rate": 1200, "max_particles": 3000,
            "lifetime_min": 0.6, "lifetime_max": 1.5,
            "speed_min": 300, "speed_max": 500,
            "direction": 90, "spread": 8,
            "gravity_x": 0, "gravity_y": 20,
            "start_color_r": 180, "start_color_g": 200, "start_color_b": 255, "start_color_a": 200,
            "end_color_r": 180, "end_color_g": 200, "end_color_b": 255, "end_color_a": 150,
            "start_scale": 1.0, "end_scale": 1.0,
            "rotation_speed": 0, "alpha_fade": "none",
        },
    },
    {
        "name": "Fireflies",
        "x": 100, "y": 200, "w": SCREEN_W - 200, "h": 300,
        "config": {
            "emission_shape": "rect",
            "particle_shape": "heart",
            "particle_size_min": 2, "particle_size_max": 5,
            "spawn_rate": 300, "max_particles": 900,
            "lifetime_min": 1.0, "lifetime_max": 3.0,
            "speed_min": 5, "speed_max": 25,
            "direction": -1, "spread": 180,
            "gravity_x": 0, "gravity_y": 0,
            "start_color_r": 200, "start_color_g": 255, "start_color_b": 100, "start_color_a": 255,
            "end_color_r": 255, "end_color_g": 200, "end_color_b": 50, "end_color_a": 0,
            "start_scale": 0.5, "end_scale": 1.5,
            "rotation_speed": 100, "alpha_fade": "fade_both",
        },
    },
]


def make_config(data: dict) -> ParticleSystemConfig:
    return ParticleSystemConfig.from_dict(data)




def _particle_params(p: Particle, zoom: float) -> Tuple[str, int, Tuple[int, int, int, int]]:
    size = max(1, ((int(p.current_size * zoom) + _SIZE_QUANT // 2) // _SIZE_QUANT) * _SIZE_QUANT)
    color = _quantize_color(p.current_color)
    return (p.shape, size, color)




class NaiveParticleRenderer(ParticleRenderer):
    def __init__(self) -> None:
        self._particles: List[Particle] = []

    def prepare(self, particles: List[Particle], config: ParticleSystemConfig) -> None:
        self._particles = particles

    def draw(self, screen: Surface, offset_x: float, offset_y: float, zoom: float) -> None:
        for p in self._particles:
            sx = int((p.x - offset_x) * zoom)
            sy = int((p.y - offset_y) * zoom)
            shape, size, color = _particle_params(p, zoom)
            if color[3] <= 0:
                continue
            surf = _render_particle(shape, size, color)
            if p.rotation_speed != 0:
                surf = pygame.transform.rotate(surf, p.rotation)
            screen.blit(surf, (sx - surf.get_width() // 2, sy - surf.get_height() // 2))

    def on_config_change(self, config: ParticleSystemConfig) -> None:
        pass




class CachedParticleRenderer(ParticleRenderer):
    def __init__(self) -> None:
        self._particles: List[Particle] = []
        self._cache: Dict[Tuple[str, int, Tuple[int, int, int, int]], Surface] = {}
        self._batch: List[Tuple[Surface, Tuple[int, int, int, int]]] = []

    def prepare(self, particles: List[Particle], config: ParticleSystemConfig) -> None:
        self._particles = particles

    def draw(self, screen: Surface, offset_x: float, offset_y: float, zoom: float) -> None:
        screen_rect = screen.get_rect()
        batch = self._batch
        batch.clear()

        for p in self._particles:
            sx = int((p.x - offset_x) * zoom)
            sy = int((p.y - offset_y) * zoom)
            shape, size, color = _particle_params(p, zoom)
            if color[3] <= 0:
                continue


            h = size + 4
            if sx + h < 0 or sx - h > screen_rect.right or sy + h < 0 or sy - h > screen_rect.bottom:
                continue

            key = (shape, size, color)
            surf = self._cache.get(key)
            if surf is None:
                surf = _render_particle(shape, size, color)
                self._cache[key] = surf

            if p.rotation_speed != 0:
                surf = pygame.transform.rotate(surf, p.rotation)
                batch.append((surf, surf.get_rect(center=(sx, sy))))
            else:
                batch.append((surf, (sx - size, sy - size, surf.get_width(), surf.get_height())))

        if batch:
            screen.blits(batch)

    def clear_cache(self) -> None:
        self._cache.clear()

    def on_config_change(self, config: ParticleSystemConfig) -> None:
        pass





def main() -> None:
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_W, SCREEN_H))
    pygame.display.set_caption("Particles: Naive vs Cached — press SPACE to toggle")
    font = pygame.font.SysFont("monospace", 14)
    clock = pygame.time.Clock()

    emitters: List[dict] = []
    for preset in PRESETS:
        cfg = make_config(preset["config"])
        ps = ParticleSystem(cfg)
        ps.emit_burst(cfg.max_particles, preset["x"], preset["y"], preset["w"], preset["h"])
        emitters.append({**preset, "ps": ps})

    cached_renderers = [CachedParticleRenderer() for _ in emitters]
    naive_renderers = [NaiveParticleRenderer() for _ in emitters]

    use_cached = True
    running = True

    while running:
        dt = clock.tick(FPS) / 1000.0
        total_particles = 0

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False
            if event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    running = False
                elif event.key == pygame.K_SPACE:
                    use_cached = not use_cached
                    for r in cached_renderers:
                        r.clear_cache()

        for em in emitters:
            em["ps"].update(dt, em["x"], em["y"], em["w"], em["h"])
            total_particles += len(em["ps"].emitter.particles)

        screen.fill(COLOR_BG)

        t0 = time.perf_counter_ns()

        if use_cached:
            for i, em in enumerate(emitters):
                r = cached_renderers[i]
                r.prepare(em["ps"].emitter.particles, em["ps"].config)
                r.draw(screen, 0, 0, ZOOM)
        else:
            for i, em in enumerate(emitters):
                r = naive_renderers[i]
                r.prepare(em["ps"].emitter.particles, em["ps"].config)
                r.draw(screen, 0, 0, ZOOM)

        t1 = time.perf_counter_ns()
        draw_ms = (t1 - t0) / 1_000_000

        fps = clock.get_fps()
        mode_label = "CACHED (surface reuse + batch + cull)" if use_cached else "NAIVE (per-frame surface)"
        mode_color = COLOR_MODE_CACHED if use_cached else COLOR_MODE_NAIVE
        lines = [
            ("Particle Renderer Comparison", (230, 230, 230)),
            ("", (230, 230, 230)),
            (f"Mode: {mode_label}", mode_color),
            (f"Particles: {total_particles}", (230, 230, 230)),
            (f"Draw time: {draw_ms:.2f} ms", (230, 230, 230)),
            (f"FPS: {fps:.0f}", (230, 230, 230)),
            ("", (230, 230, 230)),
            (f"Cache entries: {sum(len(r._cache) for r in cached_renderers)}", (230, 230, 230) if use_cached else (100, 100, 100)),
        ]
        pw, ph = 380, len(lines) * 20 + 10
        panel = pygame.Surface((pw, ph), pygame.SRCALPHA)
        panel.fill((0, 0, 0, 170))
        screen.blit(panel, (8, 6))
        y = 14
        for text, color in lines:
            screen.blit(font.render(text, True, color), (14, y))
            y += 20

        cw, ch = 480, 22
        cpanel = pygame.Surface((cw, ch), pygame.SRCALPHA)
        cpanel.fill((0, 0, 0, 150))
        screen.blit(cpanel, (8, SCREEN_H - 26))
        legend = font.render("SPACE toggle mode   |   ESC exit", True, (200, 200, 210))
        screen.blit(legend, (14, SCREEN_H - 24))

        for em in emitters:
            label = font.render(em["name"], True, (180, 180, 200))
            screen.blit(label, (em["x"] + 10, em["y"] - 40))

        pygame.display.flip()

    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    main()

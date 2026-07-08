

import sys
from pathlib import Path

import pygame

from tilemap_parser.parser.node_parse import parse_nodes_file
from tilemap_parser.runtime.map_loader import TilemapData
from tilemap_parser.runtime.particles import ParticleEmitterNode, ParticleSystem

BASE = Path(__file__).resolve().parent.parent
NODES_DIR = BASE / "data" / "nodes"
MAP_PATH = BASE / "data" / "map.json"

SCREEN_W, SCREEN_H = 800, 600
FPS = 60


def main():
    pygame.init()
    screen = pygame.display.set_mode((SCREEN_W, SCREEN_H))
    pygame.display.set_caption("Particle System — two loading approaches")
    clock = pygame.time.Clock()
    font = pygame.font.SysFont(None, 22)

    map_path = BASE / "data" / "map.json"

    td = TilemapData.load(map_path, nodes_dir=NODES_DIR)
    left_systems = []
    for pe_node in td.particle_emitters:
        ps = ParticleSystem(pe_node.config)
        ps.emit_burst(
            40, pe_node.rect.x, pe_node.rect.y, pe_node.rect.w, pe_node.rect.h
        )
        left_systems.append((ps, pe_node.rect, pe_node.name))


    raw = parse_nodes_file(NODES_DIR / "map.nodes.json")
    raw_emitters = [n for n in raw if n.node_type == "particle_emitter"]
    right_systems = []
    for node in raw_emitters:
        pe_node = ParticleEmitterNode(node)
        ps = ParticleSystem(pe_node.config)
        ps.emit_burst(
            40, pe_node.rect.x, pe_node.rect.y, pe_node.rect.w, pe_node.rect.h
        )
        right_systems.append((ps, pe_node.rect, pe_node.name))

    running = True
    while running:
        dt = clock.tick(FPS) / 1000.0

        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                running = False

        screen.fill((20, 20, 30))


        label1 = font.render("TilemapData.load + nodes_dir", True, (200, 200, 100))
        screen.blit(label1, (30, 20))

        mx, my = pygame.mouse.get_pos()
        for ps, rect, name in left_systems:
            ps.update(dt, 160, 280, rect.w, rect.h)
            ps.draw(screen, 0, 0, 1)
            lx, ly = 160, 280
            pygame.draw.rect(screen, (100, 200, 100), (lx, ly, rect.w, rect.h), 1)
            nlabel = font.render(name, True, (100, 200, 100))
            screen.blit(nlabel, (lx, ly - 18))


        label2 = font.render(
            "parse_nodes_file + ParticleEmitterNode", True, (100, 200, 200)
        )
        screen.blit(label2, (420, 20))

        for ps, rect, name in right_systems:
            ps.update(dt, 580, 280, rect.w, rect.h)
            ps.draw(screen, 0, 0, 1)
            rx, ry = 580, 280
            pygame.draw.rect(screen, (100, 200, 200), (rx, ry, rect.w, rect.h), 1)
            nlabel = font.render(name, True, (100, 200, 200))
            screen.blit(nlabel, (rx, ry - 18))


        if pygame.mouse.get_pressed()[0]:
            mpos = (mx - 16, my - 16, 32, 32)
            for ps, _, _ in left_systems:
                ps.emit_burst(5, *mpos)
            for ps, _, _ in right_systems:
                ps.emit_burst(5, *mpos)

        pygame.display.flip()

    pygame.quit()
    sys.exit()


if __name__ == "__main__":
    main()

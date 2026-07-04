from enum import auto, Enum

import pygame


class TransitionState(Enum):
    NONE = auto()
    OPENING = auto()
    CLOSING = auto()


class CircleTransition:
    __slots__ = (
        "screen_width",
        "screen_height",
        "state",
        "progress",
        "duration",
        "center_x",
        "center_y",
        "_on_complete",
    )

    def __init__(self, screen_width: int, screen_height: int) -> None:
        self.screen_width = screen_width
        self.screen_height = screen_height
        self.state = TransitionState.NONE
        self.progress = 0.0
        self.duration = 0.5
        self.center_x = screen_width // 2
        self.center_y = screen_height // 2
        self._on_complete = None

    def start_open(self, on_complete=None) -> None:
        self.state = TransitionState.OPENING
        self.progress = 0.0
        self.center_x = self.screen_width // 2
        self.center_y = self.screen_height // 2
        self._on_complete = on_complete

    def start_close(
        self,
        center_x: int | None = None,
        center_y: int | None = None,
        on_complete=None,
    ) -> None:
        self.state = TransitionState.CLOSING
        self.progress = 0.0
        if center_x is not None:
            self.center_x = center_x
        if center_y is not None:
            self.center_y = center_y
        self._on_complete = on_complete

    def update(self, dt: float) -> None:
        if self.state is TransitionState.NONE:
            return

        self.progress += dt / self.duration
        if self.progress >= 1.0:
            self.progress = 1.0
            self.state = TransitionState.NONE
            if self._on_complete:
                cb = self._on_complete
                self._on_complete = None
                cb()

    def draw(self, surface: pygame.Surface) -> None:
        if self.state is TransitionState.NONE:
            return

        w, h = self.screen_width, self.screen_height
        diagonal = int(((w * w + h * h) ** 0.5) // 2 * 1.2)

        if self.state is TransitionState.OPENING:
            radius = int(diagonal * (1 - self.progress))
            mask = pygame.Surface((w, h), pygame.SRCALPHA)
            mask.fill((0, 0, 0, 255))
            if radius > 0:
                pygame.draw.circle(mask, (0, 0, 0, 0), (self.center_x, self.center_y), radius)
            surface.blit(mask, (0, 0))
        else:
            radius = int(diagonal * self.progress)
            if radius > 0:
                mask = pygame.Surface((w, h), pygame.SRCALPHA)
                pygame.draw.circle(mask, (0, 0, 0, 255), (self.center_x, self.center_y), radius)
                surface.blit(mask, (0, 0))

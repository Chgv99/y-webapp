import { signal } from '@angular/core';

export const authToken = signal<string | null>(null);

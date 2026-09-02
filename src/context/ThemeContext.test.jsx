import React from "react";
import { describe, test, expect, beforeEach } from "vitest";
import { renderHook, act } from '@testing-library/react'
import { ThemeProvider, useTheme } from './ThemeContext';

describe("useTheme", () => {
    test("throws error when used outside ThemeProvider", () => {
        expect(() => renderHook(() => useTheme())).toThrowError(
            'useTheme debe usarse dentro de ThemeProvider'
        )
    })
})

describe("ThemeProvider", () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test("provides theme", () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });
        expect(typeof result.current.toggleTheme).toBe('function');
        expect(result.current.theme).toBe('system');
    })

    test("provides toggleTheme function", () => {
        const { result } = renderHook(() => useTheme(), {
            wrapper: ({ children }) => <ThemeProvider>{children}</ThemeProvider>,
        });
        expect(result.current.theme).toBe('system');
        act(() => result.current.toggleTheme());
        expect(result.current.theme).toBe('light');
        act(() => result.current.toggleTheme());
        expect(result.current.theme).toBe('dark');
        act(() => result.current.toggleTheme());
        expect(result.current.theme).toBe('system');
    })
})
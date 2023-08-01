import { test, expect, vi } from 'vitest'

import { TelemetryReporter } from '../../src/extension/TelemetryReporter'

vi.mock('@vscode/extension-telemetry')

test('TelemetryReporter', () => {
    const reporter = TelemetryReporter.configure('somekey')
    // @ts-expect-error mock feature
    expect(reporter.key).toBe('somekey')
})

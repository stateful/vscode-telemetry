import { test, expect, vi } from 'vitest'

import { TelemetryReporter } from '../../src/extension/TelemetryReporter'

vi.mock('@vscode/extension-telemetry')

test('TelemetryReporter', () => {
    const context: any = {
        extension: {
            packageJSON: {
                name: 'foo',
                publisher: 'bar',
                version: '1.2.3'
            }
        }
    }
    const reporter = TelemetryReporter.configure(context, 'somekey')
    // @ts-expect-error mock feature
    expect(reporter.extensionId).toBe('bar.foo')
    // @ts-expect-error mock feature
    expect(reporter.version).toBe('1.2.3')
    // @ts-expect-error mock feature
    expect(reporter.key).toBe('somekey')
})

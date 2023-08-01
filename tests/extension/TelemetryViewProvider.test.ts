import vscode from 'vscode'
import { test, expect, vi } from 'vitest'

import { TelemetryReporter } from '../../src/extension/TelemetryReporter'
import { TelemetryViewProvider } from '../../src/extension/TelemetryViewProvider'

vi.mock('vscode')
vi.mock('@vscode/extension-telemetry')

vi.mock('../../src/extension/TelemetryReporter', () => ({
    TelemetryReporter: {
        sendTelemetryEvent: vi.fn()
    }
}))

test('TelemetryViewProvider.resolveWebviewTelemetryView', () => {
    const provider = new TelemetryViewProvider()
    expect(() => provider.resolveWebviewTelemetryView({} as any, {} as any, {} as any))
        .toThrow(/resolveWebviewTelemetryView not implemented/)
})

test('TelemetryViewProvider.resolveWebviewView', async () => {
    const provider = new TelemetryViewProvider()
    provider.resolveWebviewTelemetryView = vi.fn()

    const panel = vscode.window.createWebviewPanel('view', 'some title', 4)
    await provider.resolveWebviewView(panel as any, {} as any, {} as any)
    expect(panel.webview.onDidReceiveMessage).toBeCalledTimes(1)

    const handler = vi.mocked(panel.webview.onDidReceiveMessage).mock.calls[0][0]

    handler({ foo: 'bar' })
    expect(TelemetryReporter.sendTelemetryEvent).toBeCalledTimes(0)

    handler({ __telemetryEvent__: { eventType: 'sendTelemetryEvent', eventName: 'foobar' } })
    expect(TelemetryReporter.sendTelemetryEvent).toBeCalledWith('foobar', undefined, undefined)
})

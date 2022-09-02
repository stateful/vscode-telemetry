import vscode from 'vscode'
import { test, expect, vi } from 'vitest'
import { createWebviewTelemetryPanel } from '../src/index'
import { TelemetryReporter } from '../src/extension/TelemetryReporter'

vi.mock('vscode')
vi.mock('../src/extension/TelemetryReporter', () => ({
    TelemetryReporter: {
        sendTelemetryEvent: vi.fn()
    }
}))

test('createWebviewTelemetryPanel', () => {
    const panel = createWebviewTelemetryPanel('viewType', 'title', 4, {})
    expect(vscode.window.createWebviewPanel).toBeCalledTimes(1)
    expect(panel.webview.onDidReceiveMessage).toBeCalledTimes(1)

    const handler = vi.mocked(panel.webview.onDidReceiveMessage).mock.calls[0][0]

    handler({ foo: 'bar' })
    expect(TelemetryReporter.sendTelemetryEvent).toBeCalledTimes(0)

    handler({ __telemetryEvent__: { eventType: 'sendTelemetryEvent', eventName: 'foobar' } })
    expect(TelemetryReporter.sendTelemetryEvent).toBeCalledWith('foobar', undefined, undefined, undefined)
})

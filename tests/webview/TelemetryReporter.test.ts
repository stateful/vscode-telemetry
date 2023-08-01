import vscode from 'vscode'
import { expect, test, vi } from 'vitest'
import type { WebviewApi } from 'vscode-webview'

import { TangleTelemetryReporter } from '../../src/webview/TelemetryReporter'

vi.mock('vscode')

test('TangleTelemetryReporter', () => {
    const reporter = TangleTelemetryReporter.configure(vscode as any as WebviewApi<any>)
    reporter!.sendTelemetryErrorEvent('foobar', { some: 'props' }, { mesaurements: 42 })
    expect((vscode as any as WebviewApi<any>).postMessage).toBeCalledWith({
        __telemetryEvent__: {
            eventName: 'foobar',
            eventType: 'sendTelemetryErrorEvent',
            measurements: { mesaurements: 42 },
            properties: { some: 'props' }
        }
    })
})

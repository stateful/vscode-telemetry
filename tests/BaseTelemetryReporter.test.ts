import { expect, test, vi } from 'vitest'
import { BaseTelemetryReporter } from '../src/BaseTelemetryReporter'

test('BaseTelemetryReporter', () => {
    const reporter: any = {
        sendTelemetryEvent: vi.fn(),
        sendRawTelemetryEvent: vi.fn(),
        sendDangerousTelemetryEvent: vi.fn(),
        sendTelemetryErrorEvent: vi.fn(),
        sendDangerousTelemetryErrorEvent: vi.fn(),
        sendTelemetryException: vi.fn(),
        sendDangerousTelemetryException: vi.fn()
    }
    expect(() => BaseTelemetryReporter.sendTelemetryEvent('foo'))
        .toThrow(/TelemetryReporter was not configured/)

    BaseTelemetryReporter['reporter'] = reporter
    BaseTelemetryReporter.sendTelemetryEvent('sendTelemetryEvent')
    expect(reporter.sendTelemetryEvent).toBeCalledTimes(1)
    BaseTelemetryReporter.sendRawTelemetryEvent('sendRawTelemetryEvent')
    expect(reporter.sendRawTelemetryEvent).toBeCalledTimes(1)
    BaseTelemetryReporter.sendDangerousTelemetryEvent('sendDangerousTelemetryEvent')
    expect(reporter.sendDangerousTelemetryEvent).toBeCalledTimes(1)
    BaseTelemetryReporter.sendTelemetryErrorEvent('sendTelemetryErrorEvent')
    expect(reporter.sendTelemetryErrorEvent).toBeCalledTimes(1)
    BaseTelemetryReporter.sendDangerousTelemetryErrorEvent('sendDangerousTelemetryErrorEvent')
    expect(reporter.sendDangerousTelemetryErrorEvent).toBeCalledTimes(1)
})

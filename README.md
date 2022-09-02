VS Code Telemetry [![Test Changes](https://github.com/stateful/vscode-telemetry/actions/workflows/test.yml/badge.svg)](https://github.com/stateful/vscode-telemetry/actions/workflows/test.yml)
=================

> A helper package for VS Code developers to send telemetry events from the extension host and any webview.

While [`@vscode/extension-telemetry`](https://www.npmjs.com/package/@vscode/extension-telemetry) is recommended to be used for sending telemetry events within VS Code extensions, it requires some configuration to allow sending them across extension host and webviews. This package uses `@vscode/extension-telemetry` under the hood and helps to overcome that issue.

# Install

With NPM:

```sh
npm install --save-dev vscode-telemetry
```

With Yarn

```sh
yarn add --dev vscode-telemetry
```

# Usage

The interface of the telemetry reporter is identical to `@vscode/extension-telemetry` as it is being used under the hood. Setup and usage differ a bit though.

## Setup

In order to register the reporter you need to call the `configure` method and pass in the extension context as well as the instrumentation key that you can receive from your Azure project.

```ts
import vscode from "vscode";
import { TelemetryReporter } from 'vscode-telemetry';

export async function activate(context: vscode.ExtensionContext) {
    TelemetryReporter.configure(context, process.env.INSTRUMENTATION_KEY!);
    // ...
}

export deactivate () {
    // ...
}
```

### Setup Webviews

Webviews in VS Code can be registered using the `WebviewViewProvider` or calling `vscode.window.createWebviewPanel(...)`. For both methods there are slight adjustment necessary to connect the reporter between both environments.

If you use a `WebviewViewProvider` rather than calling `resolveWebviewView` you have to call `resolveWebviewTelemetryView`, e.g.:

```ts
import { TelemetryViewProvider } from 'vscode-telemetry';
import type { WebviewView, WebviewViewProvider } from 'vscode';

export default class TodoAppPanel extends TelemetryViewProvider implements WebviewViewProvider {
    async resolveWebviewTelemetryView(webviewView: WebviewView): Promise<void> {
        webviewView.webview.html = await getHtmlForWebview(webviewView.webview, this._context);
        // ...
    }
}
```

If you create a webview via `vscode.window.createWebviewPanel(...)` just import the replacement method from this package, e.g.:

```ts
import { createWebviewTelemetryPanel } from 'vscode-telemetry';

const panel = createWebviewTelemetryPanel(...)
```

## Usage in Extension Host

Now everywhere within your VS Code extension you can send events by importing `TelemetryReporter` and call its methods, e.g.:

```ts
import { TelemetryReporter } from 'vscode-telemetry';

export class SomeController {
    private someMethod () {
        TelemetryReporter.sendTelemetryEvent('eventName', { some: 'property' })
        // ...
    }
}
```

## Usage in WebView

When using the reporter in the webview, just import it from the `vscode-telemetry/webview` package and confgure it as follows:

```ts
import { TelemetryReporter } from 'vscode-telemetry/webview';

const vscode = acquireVsCodeApi()
const reporter = TelemetryReporter.configure(vscode)

reporter.sendTelemetryEvent('Hello World')
```

# Contribute

You have an idea on how to improve the package, please send us a pull request! Have a look into our [contributing guidelines](CONTRIBUTING.md).

# Getting Help

Running into issues or are you missing a specific usecase? Feel free to [file an issue](https://github.com/stateful/tangle/issues/new) or join our [Discord](https://discord.gg/BQm8zRCBUY).

---

<p align="center"><small>Copyright 2022 © <a href="http://stateful.com/">Stateful</a> – Apache 2.0 License</small></p>

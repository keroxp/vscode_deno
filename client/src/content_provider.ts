// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.

import type { DenoExtensionContext } from "./interfaces";
import { virtualTextDocument } from "./lsp_extensions";

import type {
  CancellationToken,
  ProviderResult,
  TextDocumentContentProvider,
  Uri,
} from "vscode";

export const SCHEME = "deno";

export class DenoTextDocumentContentProvider
  implements TextDocumentContentProvider {
  constructor(private extensionContext: DenoExtensionContext) {}

  provideTextDocumentContent(
    uri: Uri,
    token: CancellationToken,
  ): ProviderResult<string> {
    return this.extensionContext.client.sendRequest(
      virtualTextDocument,
      { textDocument: { uri: uri.toString() } },
      token,
    );
  }
}

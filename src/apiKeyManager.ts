import * as dotenv from 'dotenv';
import * as path from 'path';
import * as vscode from 'vscode';
import * as fs from 'fs';

export class ApiKeyManager {
  private static instance: ApiKeyManager;
  private apiKey: string | null = null;

  private constructor() {
    this.loadApiKey();
  }

  public static getInstance(): ApiKeyManager {
    if (!ApiKeyManager.instance) {
      ApiKeyManager.instance = new ApiKeyManager();
    }
    return ApiKeyManager.instance;
  }

  private loadApiKey(): void {
    // First, try to get the API key from VSCode settings
    const config = vscode.workspace.getConfiguration('commitcraft');
    const settingsApiKey = config.get<string>('groqApiKey');

    if (settingsApiKey) {
      this.apiKey = settingsApiKey;
      return;
    }

    // If no settings key, fall back to .env file method
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showWarningMessage('No workspace folder found');
      return;
    }

    const envPath = path.join(workspaceFolders[0].uri.fsPath, '.env');

    try {
      if (fs.existsSync(envPath)) {
        dotenv.config({ path: envPath });
        this.apiKey = process.env.GROQ_API_KEY || null;

        if (!this.apiKey) {
          vscode.window.showWarningMessage('GROQ_API_KEY not found in .env file');
        }
      } else {
        vscode.window.showInformationMessage('No .env file found. Please set your API key in VSCode settings.');
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Error loading .env file: ${error}`);
    }
  }

  public getApiKey(): string | null {
    return this.apiKey;
  }

  public async setApiKey(key: string): Promise<void> {
    const config = vscode.workspace.getConfiguration('commitcraft');
    await config.update('groqApiKey', key, vscode.ConfigurationTarget.Global);
    this.apiKey = key;
  }
}

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
    // Look for .env file in project root
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
        vscode.window.showInformationMessage('No .env file found. Please create one with your GROQ_API_KEY.');
      }
    } catch (error) {
      vscode.window.showErrorMessage(`Error loading .env file: ${error}`);
    }
  }

  public getApiKey(): string | null {
    return this.apiKey;
  }

  public async setApiKey(key: string): Promise<void> {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showWarningMessage('No workspace folder found');
      return;
    }

    const envPath = path.join(workspaceFolders[0].uri.fsPath, '.env');

    try {
      // Ensure the key is not empty
      if (!key.trim()) {
        vscode.window.showWarningMessage('GROQ_API_KEY cannot be empty');
        return;
      }

      // Write or update .env file
      fs.writeFileSync(envPath, `GROQ_API_KEY=${key}`, 'utf8');
      
      // Reload the API key
      this.loadApiKey();

      vscode.window.showInformationMessage('GROQ_API_KEY successfully set');
    } catch (error) {
      vscode.window.showErrorMessage(`Error setting GROQ_API_KEY: ${error}`);
    }
  }
}

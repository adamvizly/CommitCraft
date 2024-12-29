import * as vscode from 'vscode';
import * as simpleGit from 'simple-git';
import { Groq } from 'groq-sdk';
import { ApiKeyManager } from './apiKeyManager';


export function activate(context: vscode.ExtensionContext) {
    const apiKey = ApiKeyManager.getInstance().getApiKey();
    if (apiKey) {
        const groq = new Groq({
            apiKey: apiKey
        });
    
        const disposable = vscode.commands.registerCommand('commitcraft.generateCommitMessage', async () => {
            try {
                // Get the current workspace folder
                const workspaceFolders = vscode.workspace.workspaceFolders;
                if (!workspaceFolders) {
                    vscode.window.showErrorMessage('No workspace folder found');
                    return;
                }

                const workspacePath = workspaceFolders[0].uri.fsPath;
                const git = simpleGit.simpleGit(workspacePath);

                // Get the diff of staged changes
                const diff = await git.diff(['--staged']);

                if (!diff) {
                    vscode.window.showInformationMessage('No changes to commit');
                    return;
                }

                // Generate commit message using Groq
                const response = await groq.chat.completions.create({
                    messages: [
                        {
                            role: 'system',
                            content: 'You are a professional git commit message generator. Generate a concise, meaningful commit message based on the code changes.'
                        },
                        {
                            role: 'user',
                            content: `Generate a git commit message for these changes:\n${diff}`
                        }
                    ],
                    model: 'llama-3.3-70b-versatile'
                });

                const commitMessage = response.choices[0]?.message?.content?.trim();

                if (commitMessage) {
                    // Show the generated commit message in an input box for user confirmation
                    const finalMessage = await vscode.window.showInputBox({
                        prompt: 'Review and modify the commit message',
                        value: commitMessage
                    });

                    if (finalMessage) {
                        // Execute the git commit command
                        await git.commit(finalMessage);
                        vscode.window.showInformationMessage('Commit successful!');
                    }
                }
            } catch (error) {
                vscode.window.showErrorMessage(`Error generating commit message: ${error instanceof Error ? error.message : error}`);
            }
        });

        context.subscriptions.push(disposable);
    }
}

// This method is called when your extension is deactivated
export function deactivate() {}

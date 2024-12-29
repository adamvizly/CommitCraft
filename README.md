# CommitCraft: AI-Powered Commit Message Generator

## Overview

CommitCraft is a powerful Visual Studio Code extension that leverages AI to generate meaningful and descriptive git commit messages based on your code changes. Say goodbye to generic commit messages and hello to insightful, context-aware commit descriptions!

## Features

- AI-Powered Commit Messages
  - Automatically generates concise and meaningful commit messages
  - Uses advanced Groq AI to analyze code changes
  - Provides context-aware descriptions of your modifications

- Intelligent Change Detection
  - Detects staged changes in your git repository
  - Works seamlessly with your existing git workflow

- User-Friendly Review
  - Allows you to review and modify the generated commit message
  - Gives you full control over the final commit description

## Requirements

- Visual Studio Code (v1.96.0 or later)
- Git installed and configured
- Groq API Key (sign up at [Groq Developer Portal](https://www.groq.com/))

## Installation

1. Open Visual Studio Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "CommitCraft"
4. Click "Install"

## Configuration

### API Key Configuration
There are two ways to configure your Groq API Key:

1. **Recommended: VSCode Settings**
   - Open VSCode Settings (File > Preferences > Settings)
   - Search for "CommitCraft"
   - Find the "Groq Api Key" setting
   - Enter your Groq API Key

2. Alternative: .env File
   - Create a `.env` file in your project root
   - Add your API key: `GROQ_API_KEY=your_api_key_here`

## Usage

1. Stage your changes in git
2. Open the Command Palette (Ctrl+Shift+P)
3. Type "Generate Commit Message"
4. Review the AI-generated commit message
5. Modify if needed and confirm

## Example

**Before:**
```
# Staged changes: Added new authentication method
```

**After CommitCraft:**
```
feat(auth): Implement secure JWT-based authentication with role-based access control
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Troubleshooting

- Ensure your Groq API key is correctly set
- Check that you have staged changes before generating a commit message
- Verify your git configuration is correct

## Privacy & Security

- CommitCraft only uses the staged changes for generating commit messages
- Your code changes are not stored or shared beyond the AI generation process

## Dependencies

- Groq SDK
- Simple Git
- VSCode API

## License

[MIT License]

## Acknowledgements

- Powered by Groq AI
- Inspired by developers who care about meaningful commit messages

---

**Happy Committing!**

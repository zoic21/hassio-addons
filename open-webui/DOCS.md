# Open WebUI

## Overview

Open WebUI is an extensible, self-hosted interface for AI that adapts to your workflow, all while operating entirely offline. It provides a user-friendly interface for interacting with various AI models and services.

## Installation

Follow these steps to install the add-on:

1. Navigate to the Home Assistant Add-on Store
2. Click on the three dots in the upper right corner and select "Repositories"
3. Add the repository URL: `https://github.com/zoic21/addon-open-webui`
4. Find the "Open WebUI" add-on in the list and click on it
5. Click "Install"

## Configuration

### Option: `port`

The port that Open WebUI will use. Default is `8080`.
If you have another service using port 8080, you can change this to any available port.

### Option: `env_vars`

This option allows you to pass environment variables to Open WebUI. This is useful for configuring various aspects of Open WebUI.

Example:
```yaml
env_vars:
  - name: OPENAI_API_KEY
    value: sk-xxx
  - name: OLLAMA_BASE_URL
    value: http://192.168.1.100:11434
  - name: RAG_EMBEDDING_MODEL
    value: all-MiniLM-L6-v2
```

## Available Environment Variables

Open WebUI supports a wide range of environment variables for configuration. Here are some of the most commonly used ones:

### API Keys and Endpoints

- `OPENAI_API_KEY`: Your OpenAI API key
- `OPENAI_API_BASE_URL`: Custom base URL for OpenAI API
- `ANTHROPIC_API_KEY`: Your Anthropic API key
- `OLLAMA_BASE_URL`: URL for Ollama API (e.g., http://192.168.1.100:11434)

### RAG (Retrieval-Augmented Generation)

- `RAG_EMBEDDING_MODEL`: Model to use for embeddings (default: all-MiniLM-L6-v2)
- `RAG_ENABLE_HYBRID_SEARCH`: Enable hybrid search (default: false)

### Security and Authentication

- `AUTH_ENABLED`: Enable authentication (default: false)
- `DEFAULT_USERNAME`: Default username when AUTH_ENABLED is true
- `DEFAULT_PASSWORD`: Default password when AUTH_ENABLED is true

For a complete list of available environment variables, please refer to the [Open WebUI Environment Configuration documentation](https://docs.openwebui.com/getting-started/env-configuration/#overview).

## Usage

1. Start the add-on
2. Click "OPEN WEB UI" in the add-on page to access the interface
3. Follow the Open WebUI setup wizard to configure your AI models and settings

## Connecting to Ollama

If you're using the Ollama add-on for Home Assistant, you can connect Open WebUI to it by setting the `OLLAMA_BASE_URL` environment variable:

```yaml
env_vars:
  - name: OLLAMA_BASE_URL
    value: http://homeassistant.local:11434
```

Replace `homeassistant.local` with your Home Assistant instance's address if needed.

## Support

If you have any issues or questions, please visit:

- [Open WebUI Documentation](https://docs.openwebui.com/)
- [Open WebUI GitHub Repository](https://github.com/open-webui/open-webui)
- [Add-on GitHub Repository](https://github.com/zoic21/addon-open-webui)

### Important Configuration Notes

1. **First-Run Configuration**:
   - Most environment variables can **only be set during initial setup** before first launch
   - After initial configuration, many settings become "PersistentConfig" variables that must be modified through the Open WebUI interface

2. **PersistentConfig Variables**:
   - Marked with `Persistence` in documentation
   - Once set, these values are stored internally and **won't** update from environment variables on restart
   - Examples include authentication settings, default models, and UI configurations

3. **Runtime Modifiable Variables**:
   - Non-PersistentConfig variables can be updated by:
     1. Editing environment variables in addon configuration
     2. Restarting the addon
   - These typically include service connections and API endpoints

For a complete list of PersistentConfig variables, see [Open WebUI's official documentation](https://docs.openwebui.com/getting-started/env-configuration#appbackend).

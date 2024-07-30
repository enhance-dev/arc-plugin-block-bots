# `@enhance/plugin-block-bots`

Plugin for generating a `robots.txt` route for your Enhance application.

## Install

```
npm i @enhance/plugin-block-bots
```

## Usage

### Setup

In your `app.arc` file:

```arc
@app
my-arc-app

# Define your plugins pragma and add the enhance-styles plugin
@plugins
enhance/plugin-block-bots
```

### Functionality

The plugin will add a new route to your application at `/robots.txt`. This route is used to tell web crawlers and bots which pieces of your web site they are allowed to access. By default, the response generated by the plugin looks like this:

```
User-agent: Amazonbot
User-agent: anthropic-ai
User-agent: Applebot-Extended
User-agent: Bytespider
User-agent: CCBot
User-agent: ChatGPT-User
User-agent: ClaudeBot
User-agent: Claude-Web
User-agent: cohere-ai
User-agent: Diffbot
User-agent: FacebookBot
User-agent: FriendlyCrawler
User-agent: Google-Extended
User-agent: GoogleOther
User-agent: GoogleOther-Image
User-agent: GoogleOther-Video
User-agent: GPTBot
User-agent: ImagesiftBot
User-agent: img2dataset
User-agent: Meta-ExternalAgent
User-agent: OAI-SearchBot
User-agent: omgili
User-agent: omgilibot
User-agent: PerplexityBot
User-agent: YouBot
Disallow: /
```

Once a day, the plugin will check the well maintained [ai.robots.txt](https://github.com/ai-robots-txt/ai.robots.txt) for new user agents to block. If the list has been updated, your site’s `robot.txt` file will be updated accordingly. This way you don’t need to constantly update the file as the plugin will take care of that chore for you.

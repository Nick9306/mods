module.exports = {
    name: "Calculator",
    author: ["NickG#9306"],
    version: "1.0.1",
    changelog: "Added Calculator Mod ~ NickG#9306",
    isEvent: false,
    isResponse: true,
    isMod: true,
    isAddon: false,
    section: "Bot Action",
    html: function(data) {
      return `
        <div class="form-group">
        <label id="label">Error Message if No Equation Provided *</label>
          <div class="input-group mb-3">
            <input class="form-control needed-field" name="noequation"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="noequation">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
        <label id="label">Error Message if Invalid Equation Provided *</label>
          <div class="input-group mb-3">
            <input class="form-control needed-field" name="invalidequation"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="invalidequation">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
        <label id="label">Set Embed Title</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputtitle"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputtitle">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label id="label">Set Embed Color</label>
            <input class="form-control jscolor" id="color" placeholder="#FFFFFF" name="outputcolor">
        </div>

        <div class="form-group">
        <label id="label">Set Embed Author</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputauthor"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputauthor">Insert Variable</a>
            </div>
          </div>
        </div>

        <div class="form-group">
          <label id="label">Set Embed Footer</label>
          <div class="input-group mb-3">
            <input class="form-control" name="outputfooter"></input>
            <div class="input-group-append">
              <a class="btn btn-outline-primary" role="button" id="variables" forinput="outputfooter">Insert Variable</a>
            </div>
          </div>
        </div>

        <b>Usage >> Example 1: !calc 1 + 1 | Example 2: !calc 20cm to inches | Example 3: !calc sin(90 deg)<b>
      `;
    },
    init: function(DBS) {
        DBS.BetterMods.requireModule('mathjs');
        console.log("Loaded Calculator Mod ~ NickG#9306");
    },
    mod: async function(DBS, message, action, args, command, index) {
    const math = require('mathjs')
    const { MessageEmbed } = require('discord.js');

    const NoArgs = DBS.BetterMods.parseAction(action.noequation, message)
    const Invalid = DBS.BetterMods.parseAction(action.invalidequation, message)

    if (!args[0]) return message.channel.send(NoArgs);

    let resp;
    try {
      resp = math.evaluate(args.join(' '));
    } catch (e) {
      return message.channel.send(Invalid);
    }

    const embed = new MessageEmbed()
      .setTitle(DBS.BetterMods.parseAction(action.outputtitle, message))
      .setColor(action.outputcolor)
      .setAuthor(DBS.BetterMods.parseAction(action.outputauthor, message))
      .setFooter(DBS.BetterMods.parseAction(action.outputfooter, message))
      .addField('Input', `\`\`\`js\n${args.join('')}\`\`\``)
      .addField('Output', `\`\`\`js\n${resp}\`\`\``)

    message.channel.send({ embeds: [embed] });

  DBS.callNextAction(command, message, args, index + 1);
}
};

const chineseLexicon = require('chinese-lexicon')
const { EmbedBuilder } = require('discord.js');
const {isAlpha, isEmpty} = require('../commandPages/helper.js')

const wordSearchEmbed = new EmbedBuilder()
	.setColor(0x0099FF) //Sky Blue
    
class Word {
    constructor(data) {
        this.data = data;
    }

    get simp(){return this.data.simp;}
    get trad(){return this.data.trad;}
    get definitions(){return this.data.definitions;}
    get pinyin(){return this.data.pinyin;}
    get stats(){return this.data.statistics;}
    
}

const returnLookUpWordEmbed = async function(message) {
    
    const embed = new EmbedBuilder(wordSearchEmbed.data);
    
    // If the searched word is alphabetical, search the matching chinese entries
    if (isAlpha(message)) {
        var wordInfo = await chineseLexicon.search(message)
    } else {
        var wordInfo = await chineseLexicon.getEntries(message)
    }
        
    if (isEmpty(wordInfo)) {
        embed.setTitle(`Search`)
        embed.setDescription(`I couldn\'t find any results for **${message}**`)
        return embed
    }
    
    for (let i = 0; i < Math.min(wordInfo.length, 4); i++) {
        word = new Word(wordInfo[i])

        embed.addFields(
            {name: `${word.simp} | ${word.trad}`, value: `\`HSK Level: ${word.stats.hskLevel}\`\n(${word.pinyin}) *${word.definitions.join(', ')}*`},
        )
    }

    embed.setTitle(`Search results for "${message}"`)
         .setFooter({ text: 'You can click the reactions below to see more information!', iconURL: 'https://i.postimg.cc/W3FjFhDt/Red-Bird.jpg' });
        

    return embed
}

exports.returnLookUpWordEmbed = returnLookUpWordEmbed
import { Card, Group } from './types/types';

const verbs: Card[] = [
  {
    head: 'abide',
    tails: ['abode / abided', 'abode / abided'],
    examples: ['выносить, терпеть', ''],
  },
  {
    head: 'arise',
    tails: ['arose', 'arisen'],
    examples: ['возникать, появляться, подниматься', ''],
  },
  {
    head: 'awake',
    tails: ['awakened / awoke', 'awakened / awoken'],
    examples: ['будить, проснуться', ''],
  },
  {
    head: 'backslide',
    tails: ['backslid', 'backslidden / backslid'],
    examples: ['отказываться от прежних убеждений', ''],
  },
  {
    head: 'be',
    tails: ['was, were', 'been'],
    examples: ['быть', ''],
  },
  {
    head: 'bear',
    tails: ['bore', 'born / borne'],
    examples: ['родить', ''],
  },
  {
    head: 'beat',
    tails: ['beat', 'beaten / beat'],
    examples: ['бить', ''],
  },
  {
    head: 'become',
    tails: ['became', 'become'],
    examples: ['становиться, делаться', ''],
  },
  {
    head: 'begin',
    tails: ['began', 'begun'],
    examples: ['начинать', ''],
  },
  {
    head: 'bend',
    tails: ['bent', 'bent'],
    examples: ['сгибать, гнуть', ''],
  },
  {
    head: 'bet',
    tails: ['bet / betted', 'bet / betted'],
    examples: ['держать пари', ''],
  },
  {
    head: 'bid',
    tails: ['bade / bid', 'bidden / bid'],
    examples: ['предлагать цену', ''],
  },
  {
    head: 'bind',
    tails: ['bound', 'bound'],
    examples: ['связать', ''],
  },
  {
    head: 'bite',
    tails: ['bit', 'bitten'],
    examples: ['кусать', ''],
  },
  {
    head: 'bleed',
    tails: ['bled', 'bled'],
    examples: ['кровоточить', ''],
  },
  {
    head: 'blow',
    tails: ['blew', 'blown'],
    examples: ['дуть', ''],
  },
  {
    head: 'break',
    tails: ['broke', 'broken'],
    examples: ['ломать', ''],
  },
  {
    head: 'breed',
    tails: ['bred', 'bred'],
    examples: ['выращивать, воспитывать', ''],
  },
  {
    head: 'bring',
    tails: ['brought', 'brought'],
    examples: ['приносить', ''],
  },
  {
    head: 'broadcast',
    tails: ['broadcast / broadcasted', 'broadcast / broadcasted'],
    examples: ['распространять, разбрасывать', ''],
  },
  {
    head: 'browbeat',
    tails: ['browbeat', 'browbeaten / browbeat'],
    examples: ['запугивать', ''],
  },
  {
    head: 'build',
    tails: ['built', 'built'],
    examples: ['строить', ''],
  },
  {
    head: 'burn',
    tails: ['burned / burnt', 'burned / burnt'],
    examples: ['гореть, жечь', ''],
  },
  {
    head: 'burst',
    tails: ['burst', 'burst'],
    examples: ['взрываться, прорываться', ''],
  },
  {
    head: 'bust',
    tails: ['busted / bust', 'busted / bust'],
    examples: ['разжаловать', ''],
  },
  {
    head: 'buy',
    tails: ['bought', 'bought'],
    examples: ['покупать', ''],
  },
  {
    head: 'can',
    tails: ['could', 'could'],
    examples: ['мочь, уметь', ''],
  },
  {
    head: 'cast',
    tails: ['cast', 'cast'],
    examples: ['бросить, кинуть, вышвырнуть', ''],
  },
  {
    head: 'catch',
    tails: ['caught', 'caught'],
    examples: ['ловить, хватать, успеть', ''],
  },
  {
    head: 'choose',
    tails: ['chose', 'chosen'],
    examples: ['выбирать', ''],
  },
  {
    head: 'cling',
    tails: ['clung', 'clung'],
    examples: ['цепляться, льнуть', ''],
  },
  {
    head: 'clothe',
    tails: ['clothed / clad', 'clothed / clad'],
    examples: ['одевать (кого-либо)', ''],
  },
  {
    head: 'come',
    tails: ['came', 'come'],
    examples: ['приходить', ''],
  },
  {
    head: 'cost',
    tails: ['cost', 'cost'],
    examples: ['стоить, обходиться (в какую-либо сумму)', ''],
  },
  {
    head: 'creep',
    tails: ['crept', 'crept'],
    examples: ['ползать', ''],
  },
  {
    head: 'cut',
    tails: ['cut', 'cut'],
    examples: ['резать, разрезать', ''],
  },
  {
    head: 'deal',
    tails: ['dealt', 'dealt'],
    examples: ['иметь дело', ''],
  },
  {
    head: 'dig',
    tails: ['dug', 'dug'],
    examples: ['копать', ''],
  },
  {
    head: 'dive',
    tails: ['dove / dived', 'dived'],
    examples: ['нырять, погружаться', ''],
  },
  {
    head: 'do',
    tails: ['did', 'done'],
    examples: ['делать, выполнять', ''],
  },
  {
    head: 'draw',
    tails: ['drew', 'drawn'],
    examples: ['рисовать, чертить', ''],
  },
  {
    head: 'dream',
    tails: ['dreamed / dreamt', 'dreamed / dreamt'],
    examples: ['грезить, мечтать', ''],
  },
  {
    head: 'drink',
    tails: ['drank', 'drunk'],
    examples: ['пить', ''],
  },
  {
    head: 'drive',
    tails: ['drove', 'driven'],
    examples: ['управлять (авто)', ''],
  },
  {
    head: 'dwell',
    tails: ['dwelt / dwelled', 'dwelt / dwelled'],
    examples: ['обитать, находиться', ''],
  },
  {
    head: 'eat',
    tails: ['ate', 'eaten'],
    examples: ['есть, кушать', ''],
  },
  {
    head: 'fall',
    tails: ['fell', 'fallen'],
    examples: ['падать', ''],
  },
  {
    head: 'feed',
    tails: ['fed', 'fed'],
    examples: ['кормить', ''],
  },
  {
    head: 'feel',
    tails: ['felt', 'felt'],
    examples: ['чувствовать', ''],
  },
  {
    head: 'fight',
    tails: ['fought', 'fought'],
    examples: ['драться, сражаться, бороться', ''],
  },
  {
    head: 'find',
    tails: ['found', 'found'],
    examples: ['находить', ''],
  },
  {
    head: 'fit',
    tails: ['fit', 'fit'],
    examples: ['подходить по размеру', ''],
  },
  {
    head: 'flee',
    tails: ['fled', 'fled'],
    examples: ['убегать, спасаться', ''],
  },
  {
    head: 'fling',
    tails: ['flung', 'flung'],
    examples: ['бросаться, ринуться', ''],
  },
  {
    head: 'fly',
    tails: ['flew', 'flown'],
    examples: ['летать', ''],
  },
  {
    head: 'forbid',
    tails: ['forbade', 'forbidden'],
    examples: ['запрещать', ''],
  },
  {
    head: 'forecast',
    tails: ['forecast', 'forecast'],
    examples: ['предсказывать, предвосхищать', ''],
  },
  {
    head: 'foresee',
    tails: ['foresaw', 'foreseen'],
    examples: ['предвидеть', ''],
  },
  {
    head: 'foretell',
    tails: ['foretold', 'foretold'],
    examples: ['предсказывать, прогнозировать', ''],
  },
  {
    head: 'forget',
    tails: ['forgot', 'forgotten'],
    examples: ['забывать', ''],
  },
  {
    head: 'forgive',
    tails: ['forgave', 'forgiven'],
    examples: ['прощать', ''],
  },
  {
    head: 'forsake',
    tails: ['forsook', 'forsaken'],
    examples: ['покидать', ''],
  },
  {
    head: 'freeze',
    tails: ['froze', 'frozen'],
    examples: ['замерзать', ''],
  },
  {
    head: 'get',
    tails: ['got', 'gotten / got'],
    examples: ['получать, достигать', ''],
  },
  {
    head: 'give',
    tails: ['gave', 'given'],
    examples: ['давать', ''],
  },
  {
    head: 'go',
    tails: ['went', 'gone'],
    examples: ['идти, ехать', ''],
  },
  {
    head: 'grind',
    tails: ['ground', 'ground'],
    examples: ['молоть, толочь', ''],
  },
  {
    head: 'grow',
    tails: ['grew', 'grown'],
    examples: ['расти', ''],
  },
  {
    head: 'hang',
    tails: ['hung / hanged', 'hung / hanged'],
    examples: ['вешать, развешивать', ''],
  },
  {
    head: 'have, has',
    tails: ['had', 'had'],
    examples: ['иметь', ''],
  },
  {
    head: 'hear',
    tails: ['heard', 'heard'],
    examples: ['слышать', ''],
  },
  {
    head: 'hew',
    tails: ['hewed', 'hewn / hewed'],
    examples: ['рубить', ''],
  },
  {
    head: 'hide',
    tails: ['hid', 'hidden'],
    examples: ['прятаться, скрываться', ''],
  },
  {
    head: 'hit',
    tails: ['hit', 'hit'],
    examples: ['ударять, поражать', ''],
  },
  {
    head: 'hold',
    tails: ['held', 'held'],
    examples: ['держать, удерживать, фиксировать', ''],
  },
  {
    head: 'hurt',
    tails: ['hurt', 'hurt'],
    examples: ['ранить, причинить боль', ''],
  },
  {
    head: 'inlay',
    tails: ['inlaid', 'inlaid'],
    examples: ['вкладывать, вставлять, выстилать', ''],
  },
  {
    head: 'input',
    tails: ['input / inputted', 'input / inputted'],
    examples: ['входить', ''],
  },
  {
    head: 'interweave',
    tails: ['interwove', 'interwoven'],
    examples: ['воткать', ''],
  },
  {
    head: 'keep',
    tails: ['kept', 'kept'],
    examples: ['держать, хранить', ''],
  },
  {
    head: 'kneel',
    tails: ['knelt / kneeled', 'knelt / kneeled'],
    examples: ['становиться на колени', ''],
  },
  {
    head: 'knit',
    tails: ['knitted / knit', 'knitted / knit'],
    examples: ['вязать', ''],
  },
  {
    head: 'know',
    tails: ['knew', 'known'],
    examples: ['знать, иметь представление (о чем-либо)', ''],
  },
  {
    head: 'lay',
    tails: ['laid', 'laid'],
    examples: ['класть, положить', ''],
  },
  {
    head: 'lead',
    tails: ['led', 'led'],
    examples: ['вести, руководить, управлять', ''],
  },
  {
    head: 'lean',
    tails: ['leaned / leant', 'leaned / leant'],
    examples: ['опираться, прислоняться', ''],
  },
  {
    head: 'leap',
    tails: ['leaped / leapt', 'leaped / leapt'],
    examples: ['прыгать, скакать', ''],
  },
  {
    head: 'learn',
    tails: ['learnt / learned', 'learnt / learned'],
    examples: ['учить', ''],
  },
  {
    head: 'leave',
    tails: ['left', 'left'],
    examples: ['покидать, оставлять', ''],
  },
  {
    head: 'lend',
    tails: ['lent', 'lent'],
    examples: ['одалживать, давать взаймы', ''],
  },
  {
    head: 'let',
    tails: ['let', 'let'],
    examples: ['позволять, предполагать', ''],
  },
  {
    head: 'lie',
    tails: ['lay', 'lain'],
    examples: ['лежать', ''],
  },
  {
    head: 'light',
    tails: ['lit / lighted', 'lit / lighted'],
    examples: ['освещать, зажигаться, загораться', ''],
  },
  {
    head: 'lose',
    tails: ['lost', 'lost'],
    examples: ['терять', ''],
  },
  {
    head: 'make',
    tails: ['made', 'made'],
    examples: ['делать, производить, создавать', ''],
  },
  {
    head: 'may',
    tails: ['might', 'might'],
    examples: ['мочь, иметь возможность', ''],
  },
  {
    head: 'mean',
    tails: ['meant', 'meant'],
    examples: ['значить, иметь ввиду', ''],
  },
  {
    head: 'meet',
    tails: ['met', 'met'],
    examples: ['встречать', ''],
  },
  {
    head: 'miscast',
    tails: ['miscast', 'miscast'],
    examples: ['неправильно распределять роли', ''],
  },
  {
    head: 'misdeal',
    tails: ['misdealt', 'misdealt'],
    examples: ['поступать неправильно', ''],
  },
  {
    head: 'misdo',
    tails: ['misdid', 'misdone'],
    examples: ['делать что-либо неправильно или небрежно', ''],
  },
  {
    head: 'misgive',
    tails: ['misgave', 'misgiven'],
    examples: ['внушать недоверия, опасения', ''],
  },
  {
    head: 'mishear',
    tails: ['misheard', 'misheard'],
    examples: ['ослышаться', ''],
  },
  {
    head: 'mishit',
    tails: ['mishit', 'mishit'],
    examples: ['промахнуться', ''],
  },
  {
    head: 'mislay',
    tails: ['mislaid', 'mislaid'],
    examples: ['класть не на место', ''],
  },
  {
    head: 'mislead',
    tails: ['misled', 'misled'],
    examples: ['ввести в заблуждение', ''],
  },
  {
    head: 'misread',
    tails: ['misread', 'misread'],
    examples: ['неправильно истолковывать', ''],
  },
  {
    head: 'misspell',
    tails: ['misspelled / misspelt', 'misspelled / misspelt'],
    examples: ['писать с ошибками', ''],
  },
  {
    head: 'misspend',
    tails: ['misspent', 'misspent'],
    examples: ['неразумно, зря тратить', ''],
  },
  {
    head: 'mistake',
    tails: ['mistook', 'mistaken'],
    examples: ['ошибаться', ''],
  },
  {
    head: 'misunderstand',
    tails: ['misunderstood', 'misunderstood'],
    examples: ['неправильно понимать', ''],
  },
  {
    head: 'mow',
    tails: ['mowed', 'mowed / mown'],
    examples: ['косить', ''],
  },
  {
    head: 'offset',
    tails: ['offset', 'offset'],
    examples: ['возмещать, вознаграждать, компенсировать', ''],
  },
  {
    head: 'outbid',
    tails: ['outbid', 'outbid'],
    examples: ['перебивать цену', ''],
  },
  {
    head: 'outdo',
    tails: ['outdid', 'outdone'],
    examples: ['превосходить', ''],
  },
  {
    head: 'outfight',
    tails: ['outfought', 'outfought'],
    examples: ['побеждать в бою', ''],
  },
  {
    head: 'outgrow',
    tails: ['outgrew', 'outgrown'],
    examples: ['вырастать из', ''],
  },
  {
    head: 'output',
    tails: ['output / outputted', 'output / outputted'],
    examples: ['выходить', ''],
  },
  {
    head: 'outrun',
    tails: ['outran', 'outrun'],
    examples: ['перегонять, опережать', ''],
  },
  {
    head: 'outsell',
    tails: ['outsold', 'outsold'],
    examples: ['продавать лучше или дороже', ''],
  },
  {
    head: 'outshine',
    tails: ['outshone', 'outshone'],
    examples: ['затмевать', ''],
  },
  {
    head: 'overbid',
    tails: ['overbid', 'overbid'],
    examples: ['повелевать', ''],
  },
  {
    head: 'overcome',
    tails: ['overcame', 'overcome'],
    examples: ['компенсировать', ''],
  },
  {
    head: 'overdo',
    tails: ['overdid', 'overdone'],
    examples: ['пережари(ва)ть', ''],
  },
  {
    head: 'overdraw',
    tails: ['overdrew', 'overdrawn'],
    examples: ['превышать', ''],
  },
  {
    head: 'overeat',
    tails: ['overate', 'overeaten'],
    examples: ['объедаться', ''],
  },
  {
    head: 'overfly',
    tails: ['overflew', 'overflown'],
    examples: ['перелетать', ''],
  },
  {
    head: 'overhang',
    tails: ['overhung', 'overhung'],
    examples: ['нависать', ''],
  },
  {
    head: 'overhear',
    tails: ['overheard', 'overheard'],
    examples: ['подслуш(ив)ать', ''],
  },
  {
    head: 'overlay',
    tails: ['overlaid', 'overlaid'],
    examples: ['покры(ва)ть', ''],
  },
  {
    head: 'overpay',
    tails: ['overpaid', 'overpaid'],
    examples: ['переплачивать', ''],
  },
  {
    head: 'override',
    tails: ['overrode', 'overridden'],
    examples: ['отменять, аннулировать', ''],
  },
  {
    head: 'overrun',
    tails: ['overran', 'overrun'],
    examples: ['переливаться через край', ''],
  },
  {
    head: 'oversee',
    tails: ['oversaw', 'overseen'],
    examples: ['надзирать за', ''],
  },
  {
    head: 'overshoot',
    tails: ['overshot', 'overshot'],
    examples: ['расстрелять', ''],
  },
  {
    head: 'oversleep',
    tails: ['overslept', 'overslept'],
    examples: ['проспать, заспаться', ''],
  },
  {
    head: 'overtake',
    tails: ['overtook', 'overtaken'],
    examples: ['догонять', ''],
  },
  {
    head: 'overthrow',
    tails: ['overthrew', 'overthrown'],
    examples: ['свергать', ''],
  },
  {
    head: 'partake',
    tails: ['partook', 'partaken'],
    examples: ['принимать участие', ''],
  },
  {
    head: 'pay',
    tails: ['paid', 'paid'],
    examples: ['платить', ''],
  },
  {
    head: 'plead',
    tails: ['pleaded / pled', 'pleaded / pled'],
    examples: ['обращаться к суду', ''],
  },
  {
    head: 'prepay',
    tails: ['prepaid', 'prepaid'],
    examples: ['платить вперед', ''],
  },
  {
    head: 'prove',
    tails: ['proved', 'proven / proved'],
    examples: ['доказывать', ''],
  },
  {
    head: 'put',
    tails: ['put', 'put'],
    examples: ['класть, ставить, размещать', ''],
  },
  {
    head: 'quit',
    tails: ['quit / quitted', 'quit / quitted'],
    examples: ['выходить, покидать, оставлять', ''],
  },
  {
    head: 'read',
    tails: ['read', 'read'],
    examples: ['читать', ''],
  },
  {
    head: 'rebind',
    tails: ['rebound', 'rebound'],
    examples: ['перевязывать', ''],
  },
  {
    head: 'rebuild',
    tails: ['rebuilt', 'rebuilt'],
    examples: ['перестроить', ''],
  },
  {
    head: 'recast',
    tails: ['recast', 'recast'],
    examples: ['изменять, перестраивать', ''],
  },
  {
    head: 'redo',
    tails: ['redid', 'redone'],
    examples: ['делать вновь, переделывать', ''],
  },
  {
    head: 'rehear',
    tails: ['reheard', 'reheard'],
    examples: ['слушать вторично', ''],
  },
  {
    head: 'remake',
    tails: ['remade', 'remade'],
    examples: ['переделывать', ''],
  },
  {
    head: 'rend',
    tails: ['rent', 'rent'],
    examples: ['раздирать', ''],
  },
  {
    head: 'repay',
    tails: ['repaid', 'repaid'],
    examples: ['отдавать долг', ''],
  },
  {
    head: 'rerun',
    tails: ['reran', 'rerun'],
    examples: ['выполнять повторно', ''],
  },
  {
    head: 'resell',
    tails: ['resold', 'resold'],
    examples: ['перепродавать', ''],
  },
  {
    head: 'reset',
    tails: ['reset', 'reset'],
    examples: ['возвращать', ''],
  },
  {
    head: 'resit',
    tails: ['resat', 'resat'],
    examples: ['пересиживать', ''],
  },
  {
    head: 'retake',
    tails: ['retook', 'retaken'],
    examples: ['забирать', ''],
  },
  {
    head: 'retell',
    tails: ['retold', 'retold'],
    examples: ['пересказывать', ''],
  },
  {
    head: 'rewrite',
    tails: ['rewrote', 'rewritten'],
    examples: ['перезаписать', ''],
  },
  {
    head: 'rid',
    tails: ['rid', 'rid'],
    examples: ['избавлять', ''],
  },
  {
    head: 'ride',
    tails: ['rode', 'ridden'],
    examples: ['ездить верхом', ''],
  },
  {
    head: 'ring',
    tails: ['rang', 'rung'],
    examples: ['звонить', ''],
  },
  {
    head: 'rise',
    tails: ['rose', 'risen'],
    examples: ['подняться', ''],
  },
  {
    head: 'run',
    tails: ['ran', 'run'],
    examples: ['бегать', ''],
  },
  {
    head: 'saw',
    tails: ['sawed', 'sawed / sawn'],
    examples: ['пилить', ''],
  },
  {
    head: 'say',
    tails: ['said', 'said'],
    examples: ['сказать, заявить', ''],
  },
  {
    head: 'see',
    tails: ['saw', 'seen'],
    examples: ['видеть', ''],
  },
  {
    head: 'seek',
    tails: ['sought', 'sought'],
    examples: ['искать', ''],
  },
  {
    head: 'sell',
    tails: ['sold', 'sold'],
    examples: ['продавать', ''],
  },
  {
    head: 'send',
    tails: ['sent', 'sent'],
    examples: ['посылать', ''],
  },
  {
    head: 'set',
    tails: ['set', 'set'],
    examples: ['сажать, ставить, устанавливать, садиться (о солнце)', ''],
  },
  {
    head: 'sew',
    tails: ['sewed', 'sewn / sewed'],
    examples: ['шить', ''],
  },
  {
    head: 'shake',
    tails: ['shook', 'shaken'],
    examples: ['трясти', ''],
  },
  {
    head: 'shave',
    tails: ['shaved', 'shaved / shaven'],
    examples: ['бриться', ''],
  },
  {
    head: 'shear',
    tails: ['sheared', 'sheared / shorn'],
    examples: ['стричь', ''],
  },
  {
    head: 'shed',
    tails: ['shed', 'shed'],
    examples: ['проливать', ''],
  },
  {
    head: 'shine',
    tails: ['shined / shone', 'shined / shone'],
    examples: ['светить, сиять, озарять', ''],
  },
  {
    head: 'shoot',
    tails: ['shot', 'shot'],
    examples: ['стрелять, давать побеги', ''],
  },
  {
    head: 'show',
    tails: ['showed', 'shown / showed'],
    examples: ['показывать', ''],
  },
  {
    head: 'shrink',
    tails: ['shrank / shrunk', 'shrunk'],
    examples: ['сокращаться, сжиматься', ''],
  },
  {
    head: 'shut',
    tails: ['shut', 'shut'],
    examples: ['закрывать, запирать, затворять', ''],
  },
  {
    head: 'sing',
    tails: ['sang', 'sung'],
    examples: ['петь', ''],
  },
  {
    head: 'sink',
    tails: ['sank / sunk', 'sunk'],
    examples: ['тонуть, погружаться (под воду)', ''],
  },
  {
    head: 'sit',
    tails: ['sat', 'sat'],
    examples: ['сидеть', ''],
  },
  {
    head: 'slay',
    tails: ['slew / slayed', 'slain / slayed'],
    examples: ['убивать', ''],
  },
  {
    head: 'sleep',
    tails: ['slept', 'slept'],
    examples: ['спать', ''],
  },
  {
    head: 'slide',
    tails: ['slid', 'slid'],
    examples: ['скользить', ''],
  },
  {
    head: 'sling',
    tails: ['slung', 'slung'],
    examples: ['бросать, швырять', ''],
  },
  {
    head: 'slink',
    tails: ['slunk', 'slunk'],
    examples: ['красться, идти крадучись', ''],
  },
  {
    head: 'slit',
    tails: ['slit', 'slit'],
    examples: ['разрезать, рвать в длину', ''],
  },
  {
    head: 'smell',
    tails: ['smelled / smelt', 'smelled / smelt'],
    examples: ['пахнуть, нюхать', ''],
  },
  {
    head: 'sneak',
    tails: ['snuck / sneaked', 'snuck / sneaked'],
    examples: ['красться, увиливать, избегать', ''],
  },
  {
    head: 'sow',
    tails: ['sowed', 'sown / sowed'],
    examples: ['сеять', ''],
  },
  {
    head: 'speak',
    tails: ['spoke', 'spoken'],
    examples: ['говорить', ''],
  },
  {
    head: 'speed',
    tails: ['sped / speeded', 'sped / speeded'],
    examples: ['ускорять, спешить', ''],
  },
  {
    head: 'spell',
    tails: ['spelled / spelt', 'spelled / spelt'],
    examples: ['писать или читать по буквам', ''],
  },
  {
    head: 'spend',
    tails: ['spent', 'spent'],
    examples: ['тратить, расходовать', ''],
  },
  {
    head: 'spill',
    tails: ['spilled / spilt', 'spilled / spilt'],
    examples: ['проливать, разливать', ''],
  },
  {
    head: 'spin',
    tails: ['spun', 'spun'],
    examples: ['прясть', ''],
  },
  {
    head: 'spit',
    tails: ['spit / spat', 'spit / spat'],
    examples: ['плевать', ''],
  },
  {
    head: 'split',
    tails: ['split', 'split'],
    examples: ['расщеплять', ''],
  },
  {
    head: 'spoil',
    tails: ['spoiled / spoilt', 'spoiled / spoilt'],
    examples: ['портить', ''],
  },
  {
    head: 'spread',
    tails: ['spread', 'spread'],
    examples: ['распространять(ся), простирать(ся)', ''],
  },
  {
    head: 'spring',
    tails: ['sprang / sprung', 'sprung'],
    examples: ['отскочить, прыгать, скакать, возникать', ''],
  },
  {
    head: 'stand',
    tails: ['stood', 'stood'],
    examples: ['стоять', ''],
  },
  {
    head: 'steal',
    tails: ['stole', 'stolen'],
    examples: ['воровать, красть', ''],
  },
  {
    head: 'stick',
    tails: ['stuck', 'stuck'],
    examples: ['уколоть, приклеить', ''],
  },
  {
    head: 'sting',
    tails: ['stung', 'stung'],
    examples: ['жалить', ''],
  },
  {
    head: 'stink',
    tails: ['stunk / stank', 'stunk'],
    examples: ['вонять', ''],
  },
  {
    head: 'strew',
    tails: ['strewed', 'strewn / strewed'],
    examples: ['усеять, устлать', ''],
  },
  {
    head: 'stride',
    tails: ['strode', 'stridden'],
    examples: ['шагать, наносить удар', ''],
  },
  {
    head: 'strike',
    tails: ['struck', 'struck'],
    examples: ['ударить, бить, бастовать', ''],
  },
  {
    head: 'string',
    tails: ['strung', 'strung'],
    examples: ['нанизать, натянуть', ''],
  },
  {
    head: 'strive',
    tails: ['strove / strived', 'striven / strived'],
    examples: ['стараться', ''],
  },
  {
    head: 'sublet',
    tails: ['sublet', 'sublet'],
    examples: ['передавать в субаренду', ''],
  },
  {
    head: 'swear',
    tails: ['swore', 'sworn'],
    examples: ['клясться, присягать', ''],
  },
  {
    head: 'sweep',
    tails: ['swept', 'swept'],
    examples: ['мести, подметать, сметать', ''],
  },
  {
    head: 'swell',
    tails: ['swelled', 'swollen / swelled'],
    examples: ['разбухать', ''],
  },
  {
    head: 'swim',
    tails: ['swam', 'swum'],
    examples: ['плавать, плыть', ''],
  },
  {
    head: 'swing',
    tails: ['swung', 'swung'],
    examples: ['качать, раскачивать, вертеть', ''],
  },
  {
    head: 'take',
    tails: ['took', 'taken'],
    examples: ['брать, взять', ''],
  },
  {
    head: 'teach',
    tails: ['taught', 'taught'],
    examples: ['учить, обучать', ''],
  },
  {
    head: 'tear',
    tails: ['tore', 'torn'],
    examples: ['рвать', ''],
  },
  {
    head: 'tell',
    tails: ['told', 'told'],
    examples: ['рассказать', ''],
  },
  {
    head: 'think',
    tails: ['thought', 'thought'],
    examples: ['думать', ''],
  },
  {
    head: 'throw',
    tails: ['threw', 'thrown'],
    examples: ['кидать, бросать', ''],
  },
  {
    head: 'thrust',
    tails: ['thrust', 'thrust'],
    examples: ['колоть, пронзать', ''],
  },
  {
    head: 'tread',
    tails: ['trod', 'trodden / trod'],
    examples: ['ступать', ''],
  },
  {
    head: 'unbend',
    tails: ['unbent', 'unbent'],
    examples: ['выпрямляться, разгибаться', ''],
  },
  {
    head: 'underbid',
    tails: ['underbid', 'underbid'],
    examples: ['снижать цену', ''],
  },
  {
    head: 'undercut',
    tails: ['undercut', 'undercut'],
    examples: ['сбивать цены', ''],
  },
  {
    head: 'undergo',
    tails: ['underwent', 'undergone'],
    examples: ['испытывать, переносить', ''],
  },
  {
    head: 'underlie',
    tails: ['underlay', 'underlain'],
    examples: ['лежать в основе', ''],
  },
  {
    head: 'underpay',
    tails: ['underpaid', 'underpaid'],
    examples: ['оплачивать слишком низко', ''],
  },
  {
    head: 'undersell',
    tails: ['undersold', 'undersold'],
    examples: ['продавать дешевле', ''],
  },
  {
    head: 'understand',
    tails: ['understood', 'understood'],
    examples: ['понимать, постигать', ''],
  },
  {
    head: 'undertake',
    tails: ['undertook', 'undertaken'],
    examples: ['предпринять', ''],
  },
  {
    head: 'underwrite',
    tails: ['underwrote', 'underwritten'],
    examples: ['подписываться', ''],
  },
  {
    head: 'undo',
    tails: ['undid', 'undone'],
    examples: ['уничтожать сделанное', ''],
  },
  {
    head: 'unfreeze',
    tails: ['unfroze', 'unfrozen'],
    examples: ['размораживать', ''],
  },
  {
    head: 'unsay',
    tails: ['unsaid', 'unsaid'],
    examples: ['брать назад свои слова', ''],
  },
  {
    head: 'unwind',
    tails: ['unwound', 'unwound'],
    examples: ['развертывать', ''],
  },
  {
    head: 'uphold',
    tails: ['upheld', 'upheld'],
    examples: ['поддерживать', ''],
  },
  {
    head: 'upset',
    tails: ['upset', 'upset'],
    examples: ['опрокинуться', ''],
  },
  {
    head: 'wake',
    tails: ['woke / waked', 'woken / waked'],
    examples: ['просыпаться', ''],
  },
  {
    head: 'waylay',
    tails: ['waylaid', 'waylaid'],
    examples: ['подстерегать', ''],
  },
  {
    head: 'wear',
    tails: ['wore', 'worn'],
    examples: ['носить (одежду), снашиваться', ''],
  },
  {
    head: 'weave',
    tails: ['wove / weaved', 'woven / weaved'],
    examples: ['ткать', ''],
  },
  {
    head: 'wed',
    tails: ['wed / wedded', 'wed / wedded'],
    examples: ['жениться, выдавать замуж', ''],
  },
  {
    head: 'weep',
    tails: ['wept', 'wept'],
    examples: ['плакать, рыдать', ''],
  },
  {
    head: 'wet',
    tails: ['wet / wetted', 'wet / wetted'],
    examples: ['мочить, увлажнять', ''],
  },
  {
    head: 'win',
    tails: ['won', 'won'],
    examples: ['победить, выиграть', ''],
  },
  {
    head: 'wind',
    tails: ['wound', 'wound'],
    examples: ['заводить (механизм)', ''],
  },
  {
    head: 'withdraw',
    tails: ['withdrew', 'withdrawn'],
    examples: ['взять назад, отозвать', ''],
  },
  {
    head: 'withhold',
    tails: ['withheld', 'withheld'],
    examples: ['воздерживаться, отказывать', ''],
  },
  {
    head: 'withstand',
    tails: ['withstood', 'withstood'],
    examples: ['противостоять', ''],
  },
  {
    head: 'wring',
    tails: ['wrung', 'wrung'],
    examples: ['скрутить, сжимать', ''],
  },
  {
    head: 'write',
    tails: ['wrote', 'written'],
    examples: ['писать', ''],
  },
  {
    head: 'abolish',
    tails: ['abolished', ''],
    examples: ['отменять', ''],
  },
  {
    head: 'accompany',
    tails: ['accompanied', ''],
    examples: ['сопровождать', ''],
  },
  {
    head: 'add',
    tails: ['added', ''],
    examples: ['добавить', ''],
  },
  {
    head: 'admire',
    tails: ['admired', ''],
    examples: ['восхищаться', ''],
  },
  {
    head: 'admit',
    tails: ['admitted', ''],
    examples: ['допускать', ''],
  },
  {
    head: 'agree',
    tails: ['agreed', ''],
    examples: ['соглашаться', ''],
  },
  {
    head: 'approve',
    tails: ['approved', ''],
    examples: ['одобрять', ''],
  },
  {
    head: 'arrive',
    tails: ['arrived', ''],
    examples: ['прибывать', ''],
  },
  {
    head: 'ask',
    tails: ['asked', ''],
    examples: ['спрашивать', ''],
  },
  {
    head: 'attack',
    tails: ['attacked', ''],
    examples: ['нападать', ''],
  },
  {
    head: 'believe',
    tails: ['believed', ''],
    examples: ['верить', ''],
  },
  {
    head: 'borrow',
    tails: ['borrowed', ''],
    examples: ['занимать', ''],
  },
  {
    head: 'brush',
    tails: ['brushed', ''],
    examples: ['чистить', ''],
  },
  {
    head: 'call',
    tails: ['called', ''],
    examples: ['звать', ''],
  },
  {
    head: 'cancel',
    tails: ['cancelled', ''],
    examples: ['отменять', ''],
  },
  {
    head: 'carry',
    tails: ['carried', ''],
    examples: ['нести', ''],
  },
  {
    head: 'celebrate',
    tails: ['celebrated', ''],
    examples: ['праздновать', ''],
  },
  {
    head: 'check',
    tails: ['checked', ''],
    examples: ['проверять', ''],
  },
  {
    head: 'close',
    tails: ['closed', ''],
    examples: ['закрывать', ''],
  },
  {
    head: 'collect',
    tails: ['collected', ''],
    examples: ['собирать', ''],
  },
  {
    head: 'compare',
    tails: ['compared', ''],
    examples: ['сравнивать', ''],
  },
  {
    head: 'complete',
    tails: ['completed', ''],
    examples: ['заканчивать', ''],
  },
  {
    head: 'concentrate',
    tails: ['concentrated', ''],
    examples: ['концентрироваться', ''],
  },
  {
    head: 'connect',
    tails: ['connected', ''],
    examples: ['соединять', ''],
  },
  {
    head: 'consider',
    tails: ['considered', ''],
    examples: ['рассматривать', ''],
  },
  {
    head: 'consist',
    tails: ['consisted', ''],
    examples: ['состоять', ''],
  },
  {
    head: 'continue',
    tails: ['continued', ''],
    examples: ['продолжать', ''],
  },
  {
    head: 'contribute',
    tails: ['contributed', ''],
    examples: ['пожертвовать', ''],
  },
  {
    head: 'cook',
    tails: ['cooked', ''],
    examples: ['готовить', ''],
  },
  {
    head: 'cope',
    tails: ['coped', ''],
    examples: ['справляться', ''],
  },
  {
    head: 'correct',
    tails: ['corrected', ''],
    examples: ['исправлять', ''],
  },
  {
    head: 'count',
    tails: ['counted', ''],
    examples: ['считать', ''],
  },
  {
    head: 'cover',
    tails: ['covered', ''],
    examples: ['покрывать', ''],
  },
  {
    head: 'cry',
    tails: ['cried', ''],
    examples: ['плакать', ''],
  },
  {
    head: 'damage',
    tails: ['damaged', ''],
    examples: ['повреждать', ''],
  },
  {
    head: 'deny',
    tails: ['denied', ''],
    examples: ['отрицать', ''],
  },
  {
    head: 'detect',
    tails: ['detected', ''],
    examples: ['обнаружить', ''],
  },
  {
    head: 'die',
    tails: ['died', ''],
    examples: ['умирать', ''],
  },
  {
    head: 'discover',
    tails: ['discovered', ''],
    examples: ['исследовать', ''],
  },
  {
    head: 'discuss',
    tails: ['discussed', ''],
    examples: ['обсуждать', ''],
  },
  {
    head: 'display',
    tails: ['displayed', ''],
    examples: ['показывать', ''],
  },
  {
    head: 'divide',
    tails: ['divided', ''],
    examples: ['делить', ''],
  },
  {
    head: 'drop',
    tails: ['dropped', ''],
    examples: ['понижать', ''],
  },
  {
    head: 'edit',
    tails: ['edited', ''],
    examples: ['редактировать ', ''],
  },
  {
    head: 'enter',
    tails: ['entered ', ''],
    examples: ['входить', ''],
  },
  {
    head: 'escape',
    tails: ['escaped ', ''],
    examples: ['сбегать ', ''],
  },
  {
    head: 'evaluate',
    tails: ['evaluated ', ''],
    examples: ['оценивать ', ''],
  },
  {
    head: 'explain',
    tails: ['explained ', ''],
    examples: ['объяснять ', ''],
  },
  {
    head: 'fill',
    tails: ['filled', ''],
    examples: ['наполнять ', ''],
  },
  {
    head: 'finish',
    tails: ['finished', ''],
    examples: ['заканчивать', ''],
  },
  {
    head: 'form',
    tails: ['formed', ''],
    examples: ['формировать', ''],
  },
  {
    head: 'gain',
    tails: ['gained', ''],
    examples: ['получать', ''],
  },
  {
    head: 'greet',
    tails: ['greeted', ''],
    examples: ['приветствовать', ''],
  },
  {
    head: 'guess',
    tails: ['guessed', ''],
    examples: ['догадываться', ''],
  },
  {
    head: 'happen',
    tails: ['happened', ''],
    examples: ['случаться', ''],
  },
  {
    head: 'hate',
    tails: ['hated', ''],
    examples: ['ненавидеть', ''],
  },
  {
    head: 'hire',
    tails: ['hired', ''],
    examples: ['нанимать', ''],
  },
  {
    head: 'hurry',
    tails: ['hurried', ''],
    examples: ['спешить', ''],
  },
  {
    head: 'include',
    tails: ['included', ''],
    examples: ['включать', ''],
  },
  {
    head: 'indicate',
    tails: ['indicated', ''],
    examples: ['указывать', ''],
  },
  {
    head: 'inspire',
    tails: ['inspired', ''],
    examples: ['вдохновлять', ''],
  },
  {
    head: 'intend',
    tails: ['intended', ''],
    examples: ['намереваться', ''],
  },
  {
    head: 'invite',
    tails: ['invited', ''],
    examples: ['приглашать', ''],
  },
  {
    head: 'join',
    tails: ['joined', ''],
    examples: ['присоединяться', ''],
  },
  {
    head: 'kill',
    tails: ['killed', ''],
    examples: ['убивать', ''],
  },
  {
    head: 'kiss',
    tails: ['kissed', ''],
    examples: ['целовать', ''],
  },
  {
    head: 'lack',
    tails: ['lacked', ''],
    examples: ['не хватать', ''],
  },
  {
    head: 'laugh',
    tails: ['laughed', ''],
    examples: ['смеяться', ''],
  },
  {
    head: 'like',
    tails: ['liked', ''],
    examples: ['любить', ''],
  },
  {
    head: 'limit',
    tails: ['limited', ''],
    examples: ['ограничивать', ''],
  },
  {
    head: 'link',
    tails: ['linked', ''],
    examples: ['связывать', ''],
  },
  {
    head: 'lock',
    tails: ['locked', ''],
    examples: ['закрывать', ''],
  },
  {
    head: 'look',
    tails: ['looked', ''],
    examples: ['смотреть', ''],
  },
  {
    head: 'love',
    tails: ['loved', ''],
    examples: ['любить', ''],
  },
  {
    head: 'manage',
    tails: ['managed', ''],
    examples: ['справляться', ''],
  },
  {
    head: 'marry',
    tails: ['married', ''],
    examples: ['заключать брак', ''],
  },
  {
    head: 'miss',
    tails: ['missed', ''],
    examples: ['скучать', ''],
  },
  {
    head: 'mix',
    tails: ['mixed', ''],
    examples: ['смешивать', ''],
  },
  {
    head: 'move',
    tails: ['moved', ''],
    examples: ['перемещать', ''],
  },
  {
    head: 'need',
    tails: ['needed', ''],
    examples: ['нуждаться', ''],
  },
  {
    head: 'notice',
    tails: ['noticed', ''],
    examples: ['заметить', ''],
  },
  {
    head: 'offer',
    tails: ['offered', ''],
    examples: ['предлагать', ''],
  },
  {
    head: 'organize',
    tails: ['organized', ''],
    examples: ['организовывать', ''],
  },
  {
    head: 'open',
    tails: ['opened', ''],
    examples: ['открывать', ''],
  },
  {
    head: 'pack',
    tails: ['packed', ''],
    examples: ['упаковывать', ''],
  },
  {
    head: 'paint',
    tails: ['painted', ''],
    examples: ['красисть', ''],
  },
  {
    head: 'pause',
    tails: ['paused', ''],
    examples: ['приостанавливать', ''],
  },
  {
    head: 'play',
    tails: ['played', ''],
    examples: ['играть', ''],
  },
  {
    head: 'practice',
    tails: ['practiced', ''],
    examples: ['практиковать', ''],
  },
  {
    head: 'pretend',
    tails: ['pretended', ''],
    examples: ['притворяться', ''],
  },
  {
    head: 'produce',
    tails: ['produced', ''],
    examples: ['производить', ''],
  },
  {
    head: 'provide',
    tails: ['provided', ''],
    examples: ['снабжать', ''],
  },
  {
    head: 'publish',
    tails: ['published', ''],
    examples: ['публиковать', ''],
  },
  {
    head: 'pull',
    tails: ['pulled', ''],
    examples: ['тянуть', ''],
  },
  {
    head: 'punish',
    tails: ['punished', ''],
    examples: ['наказывать', ''],
  },
  {
    head: 'raise',
    tails: ['raised', ''],
    examples: ['поднимать', ''],
  },
  {
    head: 'reach',
    tails: ['reached', ''],
    examples: ['достигать', ''],
  },
  {
    head: 'recieve',
    tails: ['recieved', ''],
    examples: ['получать', ''],
  },
  {
    head: 'recognize',
    tails: ['recognized', ''],
    examples: ['узнавать', ''],
  },
  {
    head: 'reduce',
    tails: ['reduced', ''],
    examples: ['понижать', ''],
  },
  {
    head: 'regard',
    tails: ['regarded', ''],
    examples: ['расценивать', ''],
  },
  {
    head: 'reject',
    tails: ['rejected', ''],
    examples: ['отклонять', ''],
  },
  {
    head: 'relax',
    tails: ['relaxed', ''],
    examples: ['отдыхать', ''],
  },
  {
    head: 'remain',
    tails: ['remained', ''],
    examples: ['оставаться', ''],
  },
  {
    head: 'repair',
    tails: ['repaired', ''],
    examples: ['чинить', ''],
  },
  {
    head: 'reply',
    tails: ['replied', ''],
    examples: ['отвечать', ''],
  },
  {
    head: 'research',
    tails: ['researched', ''],
    examples: ['изучать', ''],
  },
  {
    head: 'respect',
    tails: ['respected', ''],
    examples: ['уважать', ''],
  },
  {
    head: 'save',
    tails: ['saved', ''],
    examples: ['сохранять', ''],
  },
  {
    head: 'search',
    tails: ['searched', ''],
    examples: ['искать', ''],
  },
  {
    head: 'seem',
    tails: ['seemed', ''],
    examples: ['казаться', ''],
  },
  {
    head: 'serve',
    tails: ['served', ''],
    examples: ['обслуживать', ''],
  },
  {
    head: 'shout',
    tails: ['shouted', ''],
    examples: ['кричать', ''],
  },
  {
    head: 'sigh',
    tails: ['sighed', ''],
    examples: ['вздыхать', ''],
  },
  {
    head: 'sign',
    tails: ['signed', ''],
    examples: ['подписывать', ''],
  },
  {
    head: 'smile',
    tails: ['smiled', ''],
    examples: ['улыбаться', ''],
  },
  {
    head: 'stay',
    tails: ['stayed', ''],
    examples: ['оставаться', ''],
  },
  {
    head: 'stop',
    tails: ['stopped', ''],
    examples: ['останвливаться', ''],
  },
  {
    head: 'study',
    tails: ['studied', ''],
    examples: ['учиться', ''],
  },
  {
    head: 'suggest',
    tails: ['suggested', ''],
    examples: ['предлагать', ''],
  },
  {
    head: 'suppose',
    tails: ['supposed', ''],
    examples: ['предполагать', ''],
  },
  {
    head: 'surprise',
    tails: ['surprised', ''],
    examples: ['удивляться', ''],
  },
  {
    head: 'survive',
    tails: ['survived', ''],
    examples: ['выживать', ''],
  },
  {
    head: 'talk',
    tails: ['talked', ''],
    examples: ['говорить', ''],
  },
  {
    head: 'tend',
    tails: ['tended', ''],
    examples: ['ухаживать', ''],
  },
  {
    head: 'thank',
    tails: ['thanked', ''],
    examples: ['благодарить', ''],
  },
  {
    head: 'tie',
    tails: ['tied', ''],
    examples: ['связывать', ''],
  },
  {
    head: 'translate',
    tails: ['translated', ''],
    examples: ['переводить', ''],
  },
  {
    head: 'travel',
    tails: ['traveled', ''],
    examples: ['путешествовать', ''],
  },
  {
    head: 'trust',
    tails: ['trusted', ''],
    examples: ['доверять', ''],
  },
  {
    head: 'use',
    tails: ['used', ''],
    examples: ['использовать', ''],
  },
  {
    head: 'wait',
    tails: ['waited', ''],
    examples: ['ждать', ''],
  },
  {
    head: 'walk',
    tails: ['walked', ''],
    examples: ['гулять', ''],
  },
  {
    head: 'want',
    tails: ['wanted', ''],
    examples: ['хотеть', ''],
  },
  {
    head: 'waste',
    tails: ['wasted', ''],
    examples: ['растрачивать', ''],
  },
  {
    head: 'wish',
    tails: ['wished', ''],
    examples: ['хотеть', ''],
  },
  {
    head: 'work',
    tails: ['worked', ''],
    examples: ['работать', ''],
  },
  {
    head: 'worry',
    tails: ['worried', ''],
    examples: ['волноваться', ''],
  },
];

const spanish: Card[] = [
  {
    head: 'tener cuidado',
    tails: ['be careful', 'take care'],
    examples: ['', ''],
  },
  {
    head: 'hacer falta',
    tails: ['be necessary', 'lack'],
    examples: ['', ''],
  },
  {
    head: 'ponerse de acuerdo',
    tails: ['agree', 'come to an agreement'],
    examples: ['', ''],
  },
  {
    head: 'darse cuenta',
    tails: ['realize', 'notice'],
    examples: ['', ''],
  },
  {
    head: 'echar de menos',
    tails: ['miss', 'long for'],
    examples: ['', ''],
  },
  {
    head: 'tener razón',
    tails: ['be right', 'have a point'],
    examples: ['', ''],
  },
  {
    head: 'tener éxito',
    tails: ['succeed', 'be successful'],
    examples: ['', ''],
  },
  {
    head: 'tener lugar',
    tails: ['take place', 'happen'],
    examples: ['', ''],
  },
  {
    head: 'hacer caso',
    tails: ['pay attention', 'heed'],
    examples: ['', ''],
  },
  {
    head: 'hacer daño',
    tails: ['hurt', 'harm'],
    examples: ['', ''],
  },
  {
    head: 'ponerse en marcha',
    tails: ['get going', 'set off'],
    examples: ['', ''],
  },
  {
    head: 'dar la vuelta',
    tails: ['turn around', 'go around'],
    examples: ['', ''],
  },
  {
    head: 'tomar en cuenta',
    tails: ['take into account', 'consider'],
    examples: ['', ''],
  },
  {
    head: 'hacer ejercicio',
    tails: ['exercise', 'work out'],
    examples: ['', ''],
  },
  {
    head: 'tener miedo',
    tails: ['be afraid', 'be scared'],
    examples: ['', ''],
  },
  {
    head: 'dar un paseo',
    tails: ['take a walk', 'go for a walk'],
    examples: ['', ''],
  },
  {
    head: 'dar la bienvenida',
    tails: ['welcome', 'greet'],
    examples: ['', ''],
  },
  {
    head: 'hacer la cama',
    tails: ['make the bed', 'tidy up the bed'],
    examples: ['', ''],
  },
  {
    head: 'tener suerte',
    tails: ['be lucky', 'have luck'],
    examples: ['', ''],
  },
  {
    head: 'echar un vistazo',
    tails: ['take a look', 'glance'],
    examples: ['', ''],
  },
  {
    head: 'hacer un esfuerzo',
    tails: ['make an effort', 'try'],
    examples: ['', ''],
  },
  {
    head: 'hacer una pregunta',
    tails: ['ask a question', 'inquire'],
    examples: ['', ''],
  },
  {
    head: 'poner en peligro',
    tails: ['endanger', 'put in danger'],
    examples: ['', ''],
  },
  {
    head: 'dar un golpe',
    tails: ['hit', 'strike'],
    examples: ['', ''],
  },
  {
    head: 'dar la luz',
    tails: ['give birth', 'bring to light'],
    examples: ['', ''],
  },
  {
    head: 'dar la mano',
    tails: ['shake hands', 'give a hand'],
    examples: ['', ''],
  },
  {
    head: 'hacer una visita',
    tails: ['pay a visit', 'visit'],
    examples: ['', ''],
  },
  {
    head: 'tomar una decisión',
    tails: ['make a decision', 'decide'],
    examples: ['', ''],
  },
  {
    head: 'tomar medidas',
    tails: ['take measures', 'take steps'],
    examples: ['', ''],
  },
  {
    head: 'tener prisa',
    tails: ['be in a hurry', 'rush'],
    examples: ['', ''],
  },
  {
    head: 'hacer el amor',
    tails: ['make love', 'have sex'],
    examples: ['', ''],
  },
  {
    head: 'tener hambre',
    tails: ['be hungry', 'feel hungry'],
    examples: ['', ''],
  },
  {
    head: 'tener sed',
    tails: ['be thirsty', 'feel thirsty'],
    examples: ['', ''],
  },
  {
    head: 'poner en duda',
    tails: ['doubt', 'question'],
    examples: ['', ''],
  },
  {
    head: 'hacer cola',
    tails: ['queue', 'line up'],
    examples: ['', ''],
  },
  {
    head: 'tener paciencia',
    tails: ['be patient', 'have patience'],
    examples: ['', ''],
  },
  {
    head: 'hacer ruido',
    tails: ['make noise', 'be noisy'],
    examples: ['', ''],
  },
  {
    head: 'dar las gracias',
    tails: ['thank', 'express gratitude'],
    examples: ['', ''],
  },
  {
    head: 'dar por hecho',
    tails: ['assume', 'take for granted'],
    examples: ['', ''],
  },
  {
    head: 'poner la mesa',
    tails: ['set the table', 'lay the table'],
    examples: ['', ''],
  },
  {
    head: 'tener celos',
    tails: ['be jealous', 'feel envious'],
    examples: ['', ''],
  },
  {
    head: 'hacer una llamada',
    tails: ['make a call', 'call'],
    examples: ['', ''],
  },
  {
    head: 'tomar el sol',
    tails: ['sunbathe', 'bask in the sun'],
    examples: ['', ''],
  },
  {
    head: 'hacer la compra',
    tails: ['do the shopping', 'buy groceries'],
    examples: ['', ''],
  },
  {
    head: 'tener vergüenza',
    tails: ['be ashamed', 'feel embarrassed'],
    examples: ['', ''],
  },
  {
    head: 'poner en marcha',
    tails: ['start', 'set in motion'],
    examples: ['', ''],
  },
  {
    head: 'echar la culpa',
    tails: ['blame', 'accuse'],
    examples: ['', ''],
  },
  {
    head: 'hacer las paces',
    tails: ['make peace', 'reconcile'],
    examples: ['', ''],
  },
  {
    head: 'tomar el control',
    tails: ['take control', 'assume control'],
    examples: ['', ''],
  },
  {
    head: 'poner fin',
    tails: ['end', 'put an end'],
    examples: ['', ''],
  },
  {
    head: 'dar vueltas',
    tails: ['spin', 'turn'],
    examples: ['', ''],
  },
  {
    head: 'hacer daño',
    tails: ['harm', 'cause pain'],
    examples: ['', ''],
  },
  {
    head: 'dar una vuelta',
    tails: ['go for a ride', 'take a turn'],
    examples: ['', ''],
  },
  {
    head: 'echar una mano',
    tails: ['give a hand', 'help'],
    examples: ['', ''],
  },
  {
    head: 'poner atención',
    tails: ['pay attention', 'focus'],
    examples: ['', ''],
  },
  {
    head: 'hacer frente',
    tails: ['face', 'confront'],
    examples: ['', ''],
  },
  {
    head: 'tener en cuenta',
    tails: ['bear in mind', 'consider'],
    examples: ['', ''],
  },
  {
    head: 'dar paso',
    tails: ['give way', 'allow'],
    examples: ['', ''],
  },
  {
    head: 'tomar un descanso',
    tails: ['take a break', 'rest'],
    examples: ['', ''],
  },
  {
    head: 'hacer una excepción',
    tails: ['make an exception', 'exempt'],
    examples: ['', ''],
  },
  {
    head: 'dar una opinión',
    tails: ['give an opinion', 'share a view'],
    examples: ['', ''],
  },
  {
    head: 'tener confianza',
    tails: ['trust', 'be confident'],
    examples: ['', ''],
  },
  {
    head: 'poner de relieve',
    tails: ['highlight', 'emphasize'],
    examples: ['', ''],
  },
  {
    head: 'echar un cable',
    tails: ['lend a hand', 'help out'],
    examples: ['', ''],
  },
  {
    head: 'dar resultado',
    tails: ['work', 'be effective'],
    examples: ['', ''],
  },
  {
    head: 'hacer la vista gorda',
    tails: ['turn a blind eye', 'overlook'],
    examples: ['', ''],
  },
  {
    head: 'poner a prueba',
    tails: ['test', 'try out'],
    examples: ['', ''],
  },
  {
    head: 'tener envidia',
    tails: ['envy', 'be jealous'],
    examples: ['', ''],
  },
  {
    head: 'hacer historia',
    tails: ['make history', 'achieve a milestone'],
    examples: ['', ''],
  },
  {
    head: 'dar la cara',
    tails: ['face up', 'take responsibility'],
    examples: ['', ''],
  },
  {
    head: 'poner en evidencia',
    tails: ['expose', 'reveal'],
    examples: ['', ''],
  },
  {
    head: 'hacer el papel',
    tails: ['play the role', 'act'],
    examples: ['', ''],
  },
  {
    head: 'dar pie',
    tails: ['give rise', 'provoke'],
    examples: ['', ''],
  },
  {
    head: 'echar raíces',
    tails: ['take root', 'settle down'],
    examples: ['', ''],
  },
  {
    head: 'poner en contacto',
    tails: ['connect', 'get in touch'],
    examples: ['', ''],
  },
  {
    head: 'hacer realidad',
    tails: ['make real', 'fulfill'],
    examples: ['', ''],
  },
  {
    head: 'dar un salto',
    tails: ['jump', 'make a leap'],
    examples: ['', ''],
  },
  {
    head: 'poner a disposición',
    tails: ['make available', 'offer'],
    examples: ['', ''],
  },
  {
    head: 'hacer las maletas',
    tails: ['pack', 'prepare to leave'],
    examples: ['', ''],
  },
  {
    head: 'tener claro',
    tails: ['be clear', 'understand'],
    examples: ['', ''],
  },
  {
    head: 'poner en riesgo',
    tails: ['risk', 'jeopardize'],
    examples: ['', ''],
  },
  {
    head: 'dar a conocer',
    tails: ['announce', 'make known'],
    examples: ['', ''],
  },
  {
    head: 'echar al olvido',
    tails: ['forget', 'put out of mind'],
    examples: ['', ''],
  },
  {
    head: 'hacer de cuenta',
    tails: ['pretend', 'imagine'],
    examples: ['', ''],
  },
  {
    head: 'poner en práctica',
    tails: ['implement', 'put into practice'],
    examples: ['', ''],
  },
  {
    head: 'dar lugar',
    tails: ['cause', 'lead to'],
    examples: ['', ''],
  },
  {
    head: 'hacerle caso a',
    tails: ['pay attention to', 'heed'],
    examples: ['', ''],
  },
  {
    head: 'tener en mente',
    tails: ['keep in mind', 'remember'],
    examples: ['', ''],
  },
  {
    head: 'poner en marcha',
    tails: ['launch', 'start'],
    examples: ['', ''],
  },
  {
    head: 'echar chispas',
    tails: ['be furious', 'show anger'],
    examples: ['', ''],
  },
  {
    head: 'dar en el clavo',
    tails: ['hit the nail on the head', 'get it right'],
    examples: ['', ''],
  },
  {
    head: 'hacer añicos',
    tails: ['smash', 'shatter'],
    examples: ['', ''],
  },
  {
    head: 'poner al día',
    tails: ['update', 'bring up to date'],
    examples: ['', ''],
  },
  {
    head: 'tener éxito',
    tails: ['be successful', 'succeed'],
    examples: ['', ''],
  },
  {
    head: 'dar el visto bueno',
    tails: ['approve', 'give the go-ahead'],
    examples: ['', ''],
  },
  {
    head: 'poner los pelos de punta',
    tails: ['give goosebumps', 'scare'],
    examples: ['', ''],
  },
  {
    head: 'hacer un lío',
    tails: ['make a mess', 'complicate'],
    examples: ['', ''],
  },
  {
    head: 'tomar cartas',
    tails: ['intervene', 'take action'],
    examples: ['', ''],
  },
  {
    head: 'poner el grito en el cielo',
    tails: ['raise a hue and cry', 'protest loudly'],
    examples: ['', ''],
  },
  {
    head: 'echar un vistazo',
    tails: ['glance', 'peek'],
    examples: ['', ''],
  },
];

const german: Card[] = [
  {
    head: 'make a decision',
    tails: ['eine Entscheidung treffen', 'eine Wahl treffen'],
    examples: ['', ''],
  },
  {
    head: 'take a break',
    tails: ['eine Pause machen', 'eine Auszeit nehmen'],
    examples: ['', ''],
  },
  {
    head: 'have a look',
    tails: ['einen Blick werfen', 'ansehen'],
    examples: ['', ''],
  },
  {
    head: 'run a business',
    tails: ['ein Geschäft führen', 'ein Unternehmen leiten'],
    examples: ['', ''],
  },
  {
    head: 'take care',
    tails: ['sich kümmern', 'achten auf'],
    examples: ['', ''],
  },
  {
    head: 'pay attention',
    tails: ['aufpassen', 'achten auf'],
    examples: ['', ''],
  },
  {
    head: 'give a presentation',
    tails: ['eine Präsentation halten', 'vortragen'],
    examples: ['', ''],
  },
  {
    head: 'make money',
    tails: ['Geld verdienen', 'Geld machen'],
    examples: ['', ''],
  },
  {
    head: 'have a seat',
    tails: ['sich setzen', 'Platz nehmen'],
    examples: ['', ''],
  },
  {
    head: 'make sense',
    tails: ['Sinn ergeben', 'Sinn machen'],
    examples: ['', ''],
  },
  {
    head: 'keep in mind',
    tails: ['beachten', 'im Kopf behalten'],
    examples: ['', ''],
  },
  {
    head: 'lose weight',
    tails: ['abnehmen', 'Gewicht verlieren'],
    examples: ['', ''],
  },
  {
    head: 'do homework',
    tails: ['Hausaufgaben machen', 'Hausaufgaben erledigen'],
    examples: ['', ''],
  },
  {
    head: 'take place',
    tails: ['stattfinden', 'geschehen'],
    examples: ['', ''],
  },
  {
    head: 'come to an end',
    tails: ['zu Ende gehen', 'enden'],
    examples: ['', ''],
  },
  {
    head: 'get ready',
    tails: ['sich vorbereiten', 'fertig machen'],
    examples: ['', ''],
  },
  {
    head: 'take a photo',
    tails: ['ein Foto machen', 'fotografieren'],
    examples: ['', ''],
  },
  {
    head: 'make a mistake',
    tails: ['einen Fehler machen', 'einen Fehler begehen'],
    examples: ['', ''],
  },
  {
    head: 'set a goal',
    tails: ['ein Ziel setzen', 'ein Ziel festlegen'],
    examples: ['', ''],
  },
  {
    head: 'reach an agreement',
    tails: ['eine Vereinbarung treffen', 'zu einer Einigung kommen'],
    examples: ['', ''],
  },
  {
    head: 'run errands',
    tails: ['Besorgungen machen', 'Erledigungen machen'],
    examples: ['', ''],
  },
  {
    head: 'break the law',
    tails: ['das Gesetz brechen', 'gegen das Gesetz verstoßen'],
    examples: ['', ''],
  },
  {
    head: 'have fun',
    tails: ['Spaß haben', 'sich amüsieren'],
    examples: ['', ''],
  },
  {
    head: 'take a nap',
    tails: ['ein Nickerchen machen', 'ein Schläfchen halten'],
    examples: ['', ''],
  },
  {
    head: 'catch a cold',
    tails: ['sich erkälten', 'eine Erkältung bekommen'],
    examples: ['', ''],
  },
  {
    head: 'make a promise',
    tails: ['ein Versprechen geben', 'versprechen'],
    examples: ['', ''],
  },
  {
    head: 'keep a promise',
    tails: ['ein Versprechen halten', 'sein Wort halten'],
    examples: ['', ''],
  },
  {
    head: 'catch a bus',
    tails: ['den Bus erwischen', 'den Bus nehmen'],
    examples: ['', ''],
  },
  {
    head: 'save time',
    tails: ['Zeit sparen', 'Zeit einsparen'],
    examples: ['', ''],
  },
  {
    head: 'save money',
    tails: ['Geld sparen', 'Geld zurücklegen'],
    examples: ['', ''],
  },
  {
    head: 'tell the truth',
    tails: ['die Wahrheit sagen', 'die Wahrheit erzählen'],
    examples: ['', ''],
  },
  {
    head: 'make an effort',
    tails: ['sich bemühen', 'Anstrengung unternehmen'],
    examples: ['', ''],
  },
  {
    head: 'make a difference',
    tails: ['einen Unterschied machen', 'einen Unterschied bewirken'],
    examples: ['', ''],
  },
  {
    head: 'feel free',
    tails: ['sich frei fühlen', 'keine Hemmungen haben'],
    examples: ['', ''],
  },
  {
    head: 'fall asleep',
    tails: ['einschlafen', 'in den Schlaf fallen'],
    examples: ['', ''],
  },
  {
    head: 'make an appointment',
    tails: ['einen Termin vereinbaren', 'einen Termin ausmachen'],
    examples: ['', ''],
  },
  {
    head: 'have a conversation',
    tails: ['ein Gespräch führen', 'sich unterhalten'],
    examples: ['', ''],
  },
  {
    head: 'go to bed',
    tails: ['ins Bett gehen', 'schlafen gehen'],
    examples: ['', ''],
  },
  {
    head: 'get dressed',
    tails: ['sich anziehen', 'sich ankleiden'],
    examples: ['', ''],
  },
  {
    head: 'take a shower',
    tails: ['duschen', 'eine Dusche nehmen'],
    examples: ['', ''],
  },
  {
    head: 'take a walk',
    tails: ['spazieren gehen', 'einen Spaziergang machen'],
    examples: ['', ''],
  },
  {
    head: 'have breakfast',
    tails: ['frühstücken', 'das Frühstück einnehmen'],
    examples: ['', ''],
  },
  {
    head: 'fall in love',
    tails: ['sich verlieben', 'Liebe empfinden'],
    examples: ['', ''],
  },
  {
    head: 'make a call',
    tails: ['anrufen', 'einen Anruf machen'],
    examples: ['', ''],
  },
  {
    head: 'run away',
    tails: ['weglaufen', 'davonlaufen'],
    examples: ['', ''],
  },
  {
    head: 'tell a story',
    tails: ['eine Geschichte erzählen', 'eine Erzählung vortragen'],
    examples: ['', ''],
  },
  {
    head: 'go shopping',
    tails: ['einkaufen gehen', 'shoppen gehen'],
    examples: ['', ''],
  },
  {
    head: 'do the dishes',
    tails: ['abwaschen', 'den Abwasch machen'],
    examples: ['', ''],
  },
  {
    head: 'take a decision',
    tails: ['eine Entscheidung treffen', 'einen Entschluss fassen'],
    examples: ['', ''],
  },
  {
    head: 'hold hands',
    tails: ['Händchen halten', 'die Hände halten'],
    examples: ['', ''],
  },
  {
    head: 'make friends',
    tails: ['Freundschaften schließen', 'Freunde finden'],
    examples: ['', ''],
  },
  {
    head: 'make an impression',
    tails: ['Eindruck machen', 'Eindruck hinterlassen'],
    examples: ['', ''],
  },
  {
    head: 'give advice',
    tails: ['Rat geben', 'Ratschläge erteilen'],
    examples: ['', ''],
  },
  {
    head: 'get married',
    tails: ['heiraten', 'sich verheiraten'],
    examples: ['', ''],
  },
  {
    head: 'fall apart',
    tails: ['auseinanderfallen', 'zerbrechen'],
    examples: ['', ''],
  },
  {
    head: 'keep calm',
    tails: ['ruhig bleiben', 'die Ruhe bewahren'],
    examples: ['', ''],
  },
  {
    head: 'lose interest',
    tails: ['das Interesse verlieren', 'kein Interesse mehr haben'],
    examples: ['', ''],
  },
  {
    head: 'do business',
    tails: ['Geschäfte machen', 'handeln'],
    examples: ['', ''],
  },
  {
    head: 'feel sorry',
    tails: ['Mitleid empfinden', 'bedauern'],
    examples: ['', ''],
  },
  {
    head: 'make a point',
    tails: ['ein Argument vorbringen', 'einen Punkt machen'],
    examples: ['', ''],
  },
  {
    head: 'keep a secret',
    tails: ['ein Geheimnis bewahren', 'ein Geheimnis halten'],
    examples: ['', ''],
  },
  {
    head: 'have an idea',
    tails: ['eine Idee haben', 'eine Vorstellung haben'],
    examples: ['', ''],
  },
  {
    head: 'make an excuse',
    tails: ['sich entschuldigen', 'eine Ausrede finden'],
    examples: ['', ''],
  },
  {
    head: 'go on a trip',
    tails: ['eine Reise machen', 'auf Reisen gehen'],
    examples: ['', ''],
  },
  {
    head: 'take notes',
    tails: ['Notizen machen', 'mitschreiben'],
    examples: ['', ''],
  },
  {
    head: 'make a suggestion',
    tails: ['einen Vorschlag machen', 'etwas vorschlagen'],
    examples: ['', ''],
  },
  {
    head: 'take a risk',
    tails: ['ein Risiko eingehen', 'ein Wagnis eingehen'],
    examples: ['', ''],
  },
  {
    head: 'put on makeup',
    tails: ['sich schminken', 'Make-up auftragen'],
    examples: ['', ''],
  },
  {
    head: 'take responsibility',
    tails: ['Verantwortung übernehmen', 'die Verantwortung tragen'],
    examples: ['', ''],
  },
  {
    head: 'give a hand',
    tails: ['helfen', 'eine helfende Hand geben'],
    examples: ['', ''],
  },
  {
    head: 'break a habit',
    tails: ['eine Gewohnheit ablegen', 'eine Angewohnheit aufgeben'],
    examples: ['', ''],
  },
  {
    head: "lose one's temper",
    tails: ['die Beherrschung verlieren', 'die Fassung verlieren'],
    examples: ['', ''],
  },
  {
    head: 'set the table',
    tails: ['den Tisch decken', 'den Tisch vorbereiten'],
    examples: ['', ''],
  },
  {
    head: 'catch a glimpse',
    tails: ['einen flüchtigen Blick erhaschen', 'flüchtig sehen'],
    examples: ['', ''],
  },
  {
    head: 'make a wish',
    tails: ['sich etwas wünschen', 'einen Wunsch äußern'],
    examples: ['', ''],
  },
  {
    head: 'give up',
    tails: ['aufgeben', 'kapitulieren'],
    examples: ['', ''],
  },
  {
    head: 'take off',
    tails: ['abheben', 'starten'],
    examples: ['', ''],
  },
  {
    head: 'turn on',
    tails: ['einschalten', 'anmachen'],
    examples: ['', ''],
  },
  {
    head: 'turn off',
    tails: ['ausschalten', 'abschalten'],
    examples: ['', ''],
  },
  {
    head: 'put on',
    tails: ['anziehen', 'aufsetzen'],
    examples: ['', ''],
  },
  {
    head: 'look for',
    tails: ['suchen', 'nachschauen'],
    examples: ['', ''],
  },
  {
    head: 'find out',
    tails: ['herausfinden', 'ermitteln'],
    examples: ['', ''],
  },
  {
    head: 'run out of',
    tails: ['ausgehen', 'nicht mehr haben'],
    examples: ['', ''],
  },
  {
    head: 'go back',
    tails: ['zurückgehen', 'zurückkehren'],
    examples: ['', ''],
  },
  {
    head: 'come back',
    tails: ['zurückkommen', 'wiederkehren'],
    examples: ['', ''],
  },
  {
    head: 'look forward to',
    tails: ['sich freuen auf', 'erwarten'],
    examples: ['', ''],
  },
  {
    head: 'break up',
    tails: ['sich trennen', 'Schluss machen'],
    examples: ['', ''],
  },
  {
    head: 'calm down',
    tails: ['sich beruhigen', 'runterkommen'],
    examples: ['', ''],
  },
  {
    head: 'clean up',
    tails: ['aufräumen', 'putzen'],
    examples: ['', ''],
  },
  {
    head: 'cut down',
    tails: ['reduzieren', 'kürzen'],
    examples: ['', ''],
  },
  {
    head: 'deal with',
    tails: ['sich befassen mit', 'umgehen mit'],
    examples: ['', ''],
  },
  {
    head: 'depend on',
    tails: ['abhängen von', 'sich verlassen auf'],
    examples: ['', ''],
  },
  {
    head: 'fill out',
    tails: ['ausfüllen', 'ergänzen'],
    examples: ['', ''],
  },
  {
    head: 'figure out',
    tails: ['herausfinden', 'begreifen'],
    examples: ['', ''],
  },
  {
    head: 'go through',
    tails: ['durchgehen', 'durchmachen'],
    examples: ['', ''],
  },
  {
    head: 'hang out',
    tails: ['rumhängen', 'sich treffen'],
    examples: ['', ''],
  },
  {
    head: 'hold on',
    tails: ['festhalten', 'warten'],
    examples: ['', ''],
  },
  {
    head: 'let down',
    tails: ['enttäuschen', 'im Stich lassen'],
    examples: ['', ''],
  },
  {
    head: 'look after',
    tails: ['sich kümmern um', 'aufpassen auf'],
    examples: ['', ''],
  },
  {
    head: 'make up',
    tails: ['erfinden', 'sich versöhnen'],
    examples: ['', ''],
  },
];

const maths: Card[] = [
  {
    head: '(a + b)<sup>2</sup>',
    tails: ['a<sup>2</sup> + 2ab + b<sup>2</sup>'],
    examples: ['(a + b)<sup>2</sup> = a<sup>2</sup> + 2ab + b<sup>2</sup>'],
  },
  {
    head: 'A<sub>n</sub><sup>k</sup>',
    tails: ['n! / (n - k)!'],
    examples: ['A<sub>n</sub><sup>k</sup> = n! / (n - k)!'],
  },
  {
    head: 'E = mc<sup>2</sup>',
    tails: ['Energy equals mass times the speed of light squared.'],
    examples: [],
  },
];

const groupsExample: Group[] = [
  { name: 'IrregularVerbs', cards: verbs },
  { name: 'Mathematics - Formulas', cards: maths },
  { name: 'English - German 100 phrases', cards: german },
  { name: 'Spanish - English 100 Phrases', cards: spanish },
];

export default groupsExample;

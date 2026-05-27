import styles from './page.module.css'

const NEEDS = [
  {
    id: 'movement',
    num: '01',
    name: 'Movement',
    mode: 'Purpose',
    pip: '#1B3A2D',
    desc: 'Your body needs to be used. Not optimized, not tracked — just moved. Modern life has engineered physical effort out of almost everything, leaving the body understimulated and the nervous system dysregulated.',
    intro: 'Every body needs to move, but we can all move differently. Movement isn\'t a workout. It isn\'t a fitness goal. It\'s any deliberate use of your body that gets you out of your head and into the physical world. Here\'s a non-exhaustive list of ways you might consider movement in your life.',
    interpretations: [
      { label: 'Physical exercise', body: 'The most obvious form of movement, but not necessarily the most important. Running, lifting, swimming, cycling, yoga, team sports. The form matters less than the consistency. Exercise doesn\'t have to be intense to count — a 20-minute walk done regularly does more for your nervous system than an occasional brutal workout.' },
      { label: 'Daily mobility', body: 'The small movements that keep the body functional and present. Stretching when you wake up. Taking the stairs. Walking to get lunch instead of ordering it. These aren\'t workouts — they\'re the baseline of a body that feels inhabited rather than ignored.' },
      { label: 'Exertion', body: 'Pushing your body to its edge on purpose. The kind of effort that leaves you physically spent. There\'s something neurologically distinct about genuine exertion — it burns through stress hormones in a way that moderate movement doesn\'t. It doesn\'t have to be athletic. Moving furniture, chopping wood, a hard hike — anything that demands everything you have.' },
    ],
  },
  {
    id: 'community',
    num: '02',
    name: 'Community',
    mode: 'Appreciation',
    pip: '#B8C3B1',
    desc: 'You need people who know you, not followers who see you. The difference between connection and audience is presence. We\'ve built the most networked society in history and somehow ended up more isolated.',
    intro: 'Community isn\'t one thing. It\'s not just your closest friends or your family — it\'s the full web of people you belong to in different ways. Some of those relationships go deep. Others are about shared place or shared belief. All of them matter. Here\'s a non-exhaustive list of ways you might consider community in your life.',
    interpretations: [
      { label: 'Friends', body: 'The people you choose. The ones who know your history, hold your secrets, and show up when things get hard. Friendship requires maintenance that modern life makes easy to defer — and the cost of that deferral is felt quietly, over time. A small number of close friends matters more than a large number of casual ones.' },
      { label: 'Family', body: 'The people you didn\'t choose but are bound to. Family relationships are complicated precisely because they\'re not optional — and that lack of optionality can be either a source of deep belonging or deep pain, sometimes both. What matters is whether you\'re present with them, not just proximate.' },
      { label: 'Local community', body: 'The people who share your physical world. Neighbors, local businesses, the regulars at your coffee shop. These relationships are thin by design — but they create a sense of being embedded in a place, of being recognized, of mattering to a location. That sense has quietly eroded as life has moved online.' },
      { label: 'Shared belief or practice', body: 'Religious communities, civic groups, clubs, teams, recovery groups. What binds these relationships isn\'t history or proximity but shared values and shared commitment to something larger. These communities often provide a structure for belonging that\'s hard to replicate elsewhere.' },
    ],
  },
  {
    id: 'reflection',
    num: '03',
    name: 'Reflection',
    mode: 'Nourishment',
    pip: '#E8B81F',
    desc: 'You need time to process your own experience. Without it, life happens to you. Modern life fills every quiet moment with stimulus, making moments alone with our thoughts feel painfully uncomfortable rather than a luxury.',
    intro: 'Reflection isn\'t navel-gazing. It\'s the process by which experience becomes understanding — where what happened to you becomes something you can actually learn from and integrate. Without it, you accumulate experience without wisdom. Here\'s a non-exhaustive list of ways you might consider reflection in your life.',
    interpretations: [
      { label: 'Journaling', body: 'Writing as a way of thinking. Not for an audience, not for posterity — just for clarity. Putting something into words forces a specificity that thinking alone doesn\'t require. You discover what you actually believe, feel, and want in the act of writing it down. It doesn\'t have to be long or daily to work.' },
      { label: 'Meditation', body: 'Sitting with your own mind without trying to fix or escape it. Meditation isn\'t about emptying your thoughts — it\'s about watching them without being pulled into them. Even ten minutes creates a gap between stimulus and reaction that changes how you move through the rest of your day.' },
      { label: 'Therapy', body: 'Structured reflection with someone trained to ask the right questions. Therapy works because another person can see patterns in your thinking and behavior that you can\'t see from the inside. It\'s not a sign of dysfunction — it\'s one of the most effective tools available for understanding yourself.' },
      { label: 'Quiet time alone', body: 'Reflection without an agenda. A walk without headphones. Sitting with coffee before the day starts. Time that isn\'t productive by design. The mind needs unstructured space to process what it\'s carrying — and most of us never give it any.' },
    ],
  },
  {
    id: 'nutrition',
    num: '04',
    name: 'Nutrition',
    mode: 'Survival',
    pip: '#D93B1C',
    desc: 'Not just food — your relationship with food. How you eat, what you eat, whether you\'re actually present when you do. One of our most basic human functions has become one of the most medicalized, monetized, and complicated parts of modern life.',
    intro: 'Everyone has to eat, but how we relate to food is deeply personal. Nutrition isn\'t about following a diet — it\'s about understanding what your body needs and building a relationship with food that sustains rather than stresses you. Here\'s a non-exhaustive list of ways you might consider nutrition in your life.',
    interpretations: [
      { label: 'What you eat', body: 'The actual content of your diet. Not a specific plan or set of rules, but an honest awareness of whether what you\'re eating is genuinely feeding you. Food quality matters — not in a perfectionist way, but in the basic sense of whether your body feels fueled or depleted by what you\'re giving it.' },
      { label: 'How you eat', body: 'The context and quality of eating, not just the content. Eating at a table versus at a desk. Eating slowly versus on the go. Eating with people versus alone. The same meal eaten in different conditions produces a different experience — and a different relationship with food.' },
      { label: 'Your relationship with food', body: 'The emotional and psychological dimension of eating. Whether food is a source of pleasure and nourishment, or anxiety and guilt. Whether you eat in response to hunger or in response to stress. This is often the hardest dimension to address — and the one that most diets completely ignore.' },
    ],
  },
  {
    id: 'rest',
    num: '05',
    name: 'Rest',
    mode: 'Purpose',
    pip: '#1B3A2D',
    desc: 'The nervous system needs to recover. Not just through sleep but through stillness, through doing nothing on purpose. We\'ve built a culture that treats rest as laziness and then sells you supplements to fix the consequences.',
    intro: 'Rest is not the absence of activity. It\'s an active requirement — something the body and mind need the way they need food and water. We\'ve systematically removed it from adult life and then wondered why everyone is exhausted. Here\'s a non-exhaustive list of ways you might consider rest in your life.',
    interpretations: [
      { label: 'Sleep', body: 'The foundation. Everything else in this list depends on it. Sleep is when the brain consolidates memory, repairs the body, and regulates emotion. Chronic sleep deprivation doesn\'t just make you tired — it changes your cognition, your mood, and your physiology in ways that compound over time. Most adults are significantly underslept and have adapted to it so thoroughly they\'ve forgotten what rested feels like.' },
      { label: 'Stillness', body: 'Rest that happens while you\'re awake. Sitting without a screen. Lying down without sleeping. Letting your mind wander without directing it. Stillness is the most countercultural act available to most people right now — and one of the most restorative.' },
      { label: 'Recovery after effort', body: 'The intentional rest that follows exertion. Physical recovery after exercise. Mental recovery after sustained concentration. Emotional recovery after hard conversations or difficult experiences. Recovery isn\'t passive — it\'s what allows the effort to have been worth it.' },
    ],
  },
  {
    id: 'beauty',
    num: '06',
    name: 'Beauty',
    mode: 'Nourishment',
    pip: '#E8B81F',
    desc: 'You need contact with things that make you think and feel beyond yourself. Art, nature, music, something made with care. Beauty is the need most quietly crushed by efficiency culture — and the one people feel least entitled to claim.',
    intro: 'Beauty isn\'t decoration. It\'s a fundamental human need — the need to be moved, to be reminded that the world contains more than function and productivity. When we stop making space for beauty, something essential goes quiet. Here\'s a non-exhaustive list of ways you might consider beauty in your life.',
    interpretations: [
      { label: 'Art and music', body: 'The work of other human beings trying to make sense of being alive. A painting, a film, an album, a novel — these aren\'t entertainment. They\'re encounters with another consciousness. Art is one of the few places where you can feel genuinely understood by someone you\'ve never met.' },
      { label: 'Nature', body: 'The world that exists outside of human construction. A forest, an ocean, a mountain, a garden. Nature restores something in the nervous system that built environments deplete. You don\'t have to go far — even a park, a houseplant, a patch of sky has an effect. The key is actual attention, not just proximity.' },
      { label: 'Ritual and aesthetics', body: 'The beauty that lives in ordinary things. The way you set a table. The mug you drink coffee from. The route you take to work. Bringing intention and care to the texture of everyday life is its own form of beauty — and it\'s available to everyone, regardless of income or circumstance.' },
    ],
  },
  {
    id: 'money',
    num: '07',
    name: 'Money',
    mode: 'Appreciation',
    pip: '#B8C3B1',
    desc: 'Not just making money, but your relationship with money. How you think about it, whether it feels like a tool or a threat, how much mental space it occupies. Financial stress isn\'t just about having enough — it\'s about the noise it creates when you don\'t.',
    intro: 'Money is one of the loudest sources of chronic anxiety in modern life — not because people are bad at managing it, but because the system makes financial stability genuinely hard to achieve and maintain. Getting clear on your relationship with money is not about becoming wealthy. It\'s about reducing the noise. Here\'s a non-exhaustive list of ways you might consider money in your life.',
    interpretations: [
      { label: 'Income and earning', body: 'How you generate money and whether it feels sustainable. Not just the amount, but the relationship between your work and your income — whether it feels fair, whether it feels stable, whether it aligns with how you want to spend your time. Chronic underearning is a source of sustained stress that compounds across every other need.' },
      { label: 'Spending and values', body: 'Where your money actually goes versus where you want it to go. Most people have a significant gap between the two. Spending aligned with values doesn\'t require more money — it requires more honesty about what actually matters to you and fewer unconscious purchases that don\'t.' },
      { label: 'Relationship with enough', body: 'The internal question underneath all the external ones. What does enough feel like? When does more stop helping? Financial anxiety often persists well beyond the point of actual scarcity — because the threshold for enough was never defined. Getting clear on this is one of the most clarifying things you can do.' },
    ],
  },
  {
    id: 'dwelling',
    num: '08',
    name: 'Dwelling',
    mode: 'Survival',
    pip: '#D93B1C',
    desc: 'Your environment shapes your nervous system more than you think. The space you live in, its order, its light, its feel. We treat this as superficial. It isn\'t.',
    intro: 'Where and how you live is not a backdrop to your life — it\'s an active participant in it. The environments we inhabit affect our mood, our focus, our relationships, and our sense of self in ways we rarely acknowledge. Here\'s a non-exhaustive list of ways you might consider dwelling in your life.',
    interpretations: [
      { label: 'Physical order', body: 'The state of your immediate environment. Clutter isn\'t just visual — it\'s cognitive. A disordered space creates a low-level background noise in the mind that drains attention and generates mild but persistent stress. Order doesn\'t mean minimalism — it means things having a place, and that place making sense to you.' },
      { label: 'Light and environment', body: 'The quality of the physical space itself. Natural light, air quality, temperature, sound. These factors have measurable effects on mood and cognition that most people dramatically underestimate. Where you can control them, they\'re worth controlling. Where you can\'t, they\'re worth acknowledging as a genuine constraint.' },
      { label: 'The feeling of home', body: 'Whether the place you live actually feels like yours. Whether it reflects who you are, whether it restores you when you return to it, whether it feels like a refuge or just a place you sleep. Home is not a location — it\'s a feeling. And it\'s worth investing in deliberately.' },
      { label: 'Interior and exterior design', body: 'The intentional shaping of your environment. Not decoration for its own sake, but the considered arrangement of space, color, texture, and form in a way that serves how you actually live. This extends to the exterior — the neighborhood, the streetscape, the natural surroundings. The built environment you inhabit every day is worth paying attention to.' },
    ],
  },
  {
    id: 'intimacy',
    num: '09',
    name: 'Intimacy',
    mode: 'Purpose',
    pip: '#1B3A2D',
    desc: 'Not just romantic or physical intimacy, but shared vulnerability, depth, and security. To be truly known by another person. The willingness to be seen clearly and to offer the same in return.',
    intro: 'Intimacy is the need that modern life makes hardest to meet — not because connection is unavailable, but because genuine intimacy requires a quality of presence and vulnerability that most of us have become deeply unpracticed at. Here\'s a non-exhaustive list of ways you might consider intimacy in your life.',
    interpretations: [
      { label: 'Romantic partnership', body: 'The intimate relationship most people think of first. A partnership that goes beyond attraction or companionship to genuine mutual knowing — where you are seen in your full complexity and accepted anyway. This kind of intimacy requires sustained vulnerability, which is why it\'s rare and why its absence is so acutely felt.' },
      { label: 'Close friendship', body: 'Intimacy outside of romance. The friend who knows the version of you that doesn\'t perform. Who you can be honest with about the things you\'re ashamed of or afraid of. Close friendship is one of the most undervalued relationships in adult life — treated as a luxury rather than a fundamental need.' },
    ],
  },
  {
    id: 'play',
    num: '10',
    name: 'Play',
    mode: 'Nourishment',
    pip: '#E8B81F',
    desc: 'Unstructured, purposeless joy. Things you do for no reason other than they feel good. Play is almost entirely absent from adult life and almost never named as something adults actually need.',
    intro: 'Somewhere in adulthood, we decided that everything had to have a point. Hobbies became side hustles. Exercise became optimization. Creativity became content. Play — genuine, purposeless play — got quietly eliminated from the schedule. Here\'s a non-exhaustive list of ways you might consider play in your life.',
    interpretations: [
      { label: 'Creative play', body: 'Making things without caring whether they\'re good. Drawing, cooking something experimental, writing for no one, building something with your hands. The point is not the output — it\'s the state of absorption and freedom that the making produces. When creativity becomes about performance or productivity, it stops being play.' },
      { label: 'Physical play', body: 'Using your body for fun rather than fitness. A pickup game, a dance class, swimming in the ocean, throwing a frisbee. Physical play has a quality of lightness that exercise often doesn\'t — it reconnects you to your body as a source of joy rather than a project to be improved.' },
      { label: 'Solo exploration', body: 'Following curiosity without a destination. A long drive with no plan. Reading about something you\'ll never use. Wandering a neighborhood you\'ve never been to. Solo exploration is play for the mind — it reminds you that not everything has to be optimized, and that some of the best things happen when you\'re not trying to make them happen.' },
    ],
  },
]

export const metadata = {
  title: 'The Needs — Maslow',
  description: 'The ten needs that form the foundation of a life well lived.',
}

export default function NeedPage() {
  return (
    <div className={styles.page}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarLabel}>The ten needs</div>
        <nav className={styles.sidebarNav}>
          {NEEDS.map(need => (
            <a key={need.id} href={`#${need.id}`} className={styles.sidebarLink}>
              <span className={styles.sidebarPip} style={{ background: need.pip }} />
              {need.name}
            </a>
          ))}
        </nav>
      </aside>

      <main className={styles.main}>
        <div className={styles.intro}>
          <div className={styles.introEyebrow}>The ten needs</div>
          <h1 className={styles.introHeadline}>the conditions for<br /><em>being alive.</em></h1>
          <p className={styles.introBody}>We are living through a unique moment of collective disconnection. The systems we've built to make life easier — digital convenience, algorithmic entertainment, optimized productivity — have quietly hollowed out the very things that make us feel alive. We have become disconnected from other people, from the environments around us, and most quietly, from ourselves. We are more connected and more isolated, more informed and more confused, more comfortable and more anxious than any generation before us.</p>
          <p className={styles.introBody}>The needs on this page are not a wellness checklist. They are the conditions under which a human being actually functions — the ground beneath everything else. When they go unmet, anxiety fills the space they leave behind. Not because something is wrong with you, but because something essential is missing. Meeting your needs isn't self-care. It's what allows you to actually experience meaning rather than simply exist next to it.</p>
        </div>

        {NEEDS.map((need, i) => (
          <div key={need.id} className={styles.needSection} id={need.id}>
            <div className={styles.needBgNum}>{need.num}</div>
            <div className={styles.needName}>{need.name}</div>
            <div className={styles.needMode}>
              <span className={styles.needModePip} style={{ background: need.pip }} />
              <span className={styles.needModeLabel}>{need.mode}</span>
            </div>
            <p className={styles.needDesc}>{need.desc}</p>
            <p className={styles.needIntro}>{need.intro}</p>
            <div className={styles.interpretations}>
              {need.interpretations.map(item => (
                <div key={item.label} className={styles.interpretation}>
                  <div className={styles.interpretationLabel}>{item.label}</div>
                  <div className={styles.interpretationBody}>{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </main>
    </div>
  )
}
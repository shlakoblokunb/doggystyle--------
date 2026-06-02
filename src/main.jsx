const { useEffect, useMemo, useState } = React;

const pages = [
  ['home', 'Главная', 'index.html'],
  ['about', 'О породе', 'about.html'],
  ['care', 'Уход', 'care.html'],
  ['gallery', 'Галерея', 'gallery.html'],
  ['facts', 'Факты', 'facts.html'],
  ['contacts', 'Контакты', 'contacts.html'],
].map(([id, label, href]) => ({ id, label, href }));

const metadata = {
  home: {
    title: 'Бультерьер — всё о собаке',
    description: 'Бультерьер: всё о собаке. История породы, уход, воспитание, галерея и интересные факты.',
    keywords: 'бультерьер, бультерьер собака, порода бультерьер, уход за бультерьером, характер бультерьера, воспитание бультерьера, BullLover',
  },
  about: {
    title: 'О породе | Бультерьер',
    description: 'История происхождения, особенности характера и стандарты породы бультерьер.',
    keywords: 'история бультерьера, особенности бультерьера, порода бультерьер, характер бультерьера, Джеймс Хинкс',
  },
  care: {
    title: 'Уход и содержание | Бультерьер',
    description: 'Уход, питание, воспитание и содержание бультерьера.',
    keywords: 'уход за бультерьером, содержание бультерьера, воспитание бультерьера, прогулки с бультерьером, здоровье бультерьера',
  },
  gallery: {
    title: 'Галерея | Бультерьер',
    description: 'Фотогалерея щенков, взрослых и играющих бультерьеров.',
    keywords: 'галерея бультерьеров, фото бультерьера, щенки бультерьера, взрослый бультерьер, играющий бультерьер',
  },
  facts: {
    title: 'Интересные факты | Бультерьер',
    description: 'Интересные факты и небольшая викторина о породе бультерьер.',
    keywords: 'интересные факты о бультерьерах, викторина бультерьер, факты бультерьер, особенности породы',
  },
  contacts: {
    title: 'Контакты | Бультерьер',
    description: 'Контактная информация и сведения об авторе проекта о породе бультерьер.',
    keywords: 'контакты BullLover, автор проекта бультерьер, бультерьер контакты, Фролова Алёна',
  },
};

const homeQuiz = [
  ['Готовы к активным прогулкам каждый день?', [['Да', 2], ['Нет', 0]]],
  ['У вас есть опыт воспитания собак?', [['Да', 1], ['Нет', 0]]],
  ['Готовы уделять много времени воспитанию?', [['Да', 2], ['Нет', 0]]],
];

const factsQuiz = [
  ['В какой стране была выведена порода бультерьер?', [['Германия', false], ['Англия', true], ['Франция', false]]],
  ['Какой главный признак породы?', [['Яйцевидная голова', true], ['Длинные уши', false], ['Кудрявая шерсть', false]]],
  ['Бультерьер — это в первую очередь:', [['Охотничья собака', false], ['Служебная собака', false], ['Собака-компаньон', true]]],
];

const galleryData = [
  ['gallery1.jpg', 'puppy', 'Щенок'],
  ['gallery2.jpg', 'puppy', 'Щенок'],
  ['gallery3.jpg', 'puppy', 'Щенок'],
  ['gallery13.jpg', 'puppy', 'Щенок'],
  ['gallery4.jpg', 'adult', 'Взрослый'],
  ['gallery5.jpg', 'adult', 'Взрослый'],
  ['gallery6.jpg', 'adult', 'Взрослый'],
  ['gallery10.jpg', 'adult', 'Взрослый'],
  ['gallery11.jpg', 'adult', 'Взрослый'],
  ['gallery7.jpg', 'play', 'Игра'],
  ['gallery8.jpg', 'play', 'Игра'],
  ['gallery9.jpg', 'play', 'Игра'],
  ['gallery12.jpg', 'play', 'Игра'],
].map(([file, category, alt]) => ({ src: `images/${file}`, category, alt }));

const careRows = [
  ['Страна происхождения', 'Англия'],
  ['Группа FCI', 'Терьеры'],
  ['Рост', '30–45 см'],
  ['Вес', '20–35 кг'],
  ['Продолжительность жизни', '12–14 лет'],
  ['Шерсть', 'Короткая, гладкая'],
  ['Темперамент', 'Энергичный, преданный, смелый'],
  ['Назначение', 'Компаньон'],
];

function getPageFromPath(pathname) {
  const file = pathname.split('/').pop() || 'index.html';
  return file === 'index.html' || file === '' ? 'home' : file.replace('.html', '');
}

function setMetaTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.name = name;
    document.head.appendChild(tag);
  }

  tag.content = content;
}

function useCurrentPage() {
  const [page, setPage] = useState(() => getPageFromPath(window.location.pathname));

  useEffect(() => {
    const syncPage = () => setPage(getPageFromPath(window.location.pathname));
    window.addEventListener('popstate', syncPage);
    return () => window.removeEventListener('popstate', syncPage);
  }, []);

  const navigate = (event, href) => {
    event.preventDefault();
    window.history.pushState({}, '', href);
    setPage(getPageFromPath(href));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [page, navigate];
}

function useScrollReveal(page) {
  useEffect(() => {
    const elements = [...document.querySelectorAll('.reveal')];
    if (!elements.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('active'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.18 });

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [page]);
}

function Header({ navigate }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="logo">BullLover</div>
      <nav className={`nav${open ? ' active' : ''}`} id="nav">
        {pages.map((page) => (
          <a key={page.id} href={page.href} onClick={(event) => { setOpen(false); navigate(event, page.href); }}>
            {page.label}
          </a>
        ))}
      </nav>
      <button className="burger" id="burger" aria-label="Открыть меню" onClick={() => setOpen((value) => !value)}>☰</button>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <h3>BullLover</h3>
        <p>Информационный сайт о породе бультерьер</p>
        <p>© 2026</p>
      </div>
    </footer>
  );
}

function TopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button id="topBtn" aria-label="Наверх" className={visible ? 'top-btn-visible' : ''} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
      ↑
    </button>
  );
}

function PageHero({ title, text }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  );
}

function SectionTitle({ title, text }) {
  return (
    <div className="section-title">
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function Cards({ items, className = 'cards' }) {
  return (
    <div className={className}>
      {items.map((item) => (
        <article className="card reveal" key={item.title}>
          {item.icon && <div className="pink-square">{item.icon}</div>}
          <h3>{item.title}</h3>
          <p>{item.text}</p>
        </article>
      ))}
    </div>
  );
}

function Quiz({ title, questions, scoreToResult, finalResult }) {
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const current = questions[step];

  const answer = (value) => {
    const nextScore = score + (typeof value === 'number' ? value : value ? 1 : 0);
    setScore(nextScore);

    if (step + 1 < questions.length) setStep((index) => index + 1);
    else setDone(true);
  };

  const restart = () => {
    setStep(0);
    setScore(0);
    setDone(false);
  };

  return (
    <div className="quiz-box">
      <h2 className={title === 'Подходит ли вам бультерьер?' ? 'quiz-title' : ''}>{title}</h2>
      {!done ? (
        <>
          <div className="quiz-question">{current[0]}</div>
          <div className="quiz-buttons">
            {current[1].map(([label, value]) => <button className="btn" key={label} onClick={() => answer(value)}>{label}</button>)}
          </div>
        </>
      ) : (
        <>
          <div className="quiz-result-card">{finalResult ? finalResult(score, questions.length) : scoreToResult(score)}</div>
          {!finalResult && <button className="btn quiz-restart" onClick={restart}>Пройти заново</button>}
        </>
      )}
    </div>
  );
}

function HomePage({ navigate }) {
  const [counterValues, setCounterValues] = useState([0, 0, 0]);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startCounters = () => {
      const stats = document.querySelector('.stats');
      if (started || !stats || stats.getBoundingClientRect().top >= window.innerHeight - 100) return;

      setStarted(true);
      const targets = [14, 35, 100];
      let frame = 0;
      const animate = () => {
        frame += 1;
        setCounterValues(targets.map((target) => Math.min(target, Math.ceil((target / 80) * frame))));
        if (frame < 80) requestAnimationFrame(animate);
      };
      animate();
    };

    startCounters();
    window.addEventListener('scroll', startCounters);
    return () => window.removeEventListener('scroll', startCounters);
  }, [started]);

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-label">энергичный • умный • преданный</span>
          <h1 className="hero-title">Бультерьер:<br />всё о собаке</h1>
          <p>Узнайте всё о характере, воспитании, уходе и особенностях породы</p>
          <br />
          <a href="about.html" className="btn" onClick={(event) => navigate(event, 'about.html')}>Подробнее</a>
        </div>
      </section>

      <section>
        <div className="container">
          <SectionTitle title="Почему именно бультерьер?" />
          <Cards items={[
            { icon: '❤', title: 'Преданность', text: 'Сильная привязанность к семье' },
            { icon: '⚡', title: 'Активность', text: 'Любит движение и игры' },
            { icon: '🧠', title: 'Интеллект', text: 'Быстро обучается' },
          ]} />
        </div>
      </section>

      <section className="stats">
        {['лет жизни', 'кг веса', '% любви к хозяину'].map((label, index) => (
          <div className="stat" key={label}><h3 className="counter">{counterValues[index]}</h3><p>{label}</p></div>
        ))}
      </section>

      <section className="features reveal">
        <div className="container">
          <div><h2>Собака с уникальным характером</h2><p>Бультерьер — добрый и энергичный компаньон</p></div>
          <div><img src="images/feature-dog.jpg" alt="Бультерьер" className="feature-img" /></div>
        </div>
      </section>

      <section className="reveal">
        <Quiz title="Подходит ли вам бультерьер?" questions={homeQuiz} scoreToResult={(score) => (score >= 4 ? 'Кажется, бультерьер вам подходит!' : 'Стоит рассмотреть более спокойные породы')} />
      </section>
    </>
  );
}

function AboutPage() {
  return (
    <>
      <PageHero title="История и особенности породы" text="Формула бультерьера" />
      <section>
        <div className="container">
          <SectionTitle title="Происхождение породы" />
          <div className="about-history reveal">
            <div className="about-history-text">
              <p>Порода была выведена в Англии в XIX веке заводчиком Джеймсом Хинксом. Он скрестил староанглийского бульдога, белого английского терьера и далматина, чтобы получить идеального охотника на крыс и бойца. Впервые белоснежного бультерьера представили на выставке в 1862 году, после чего собака стала аристократическим символом.</p>
              <p>Современный бультерьер значительно отличается от своих предков. Сегодня это прежде всего собака-компаньон, ориентированная на общение с человеком и жизнь в семье.</p>
            </div>
            <div className="about-history-image"><img src="images/old.jpg" alt="Старинный бультерьер" /></div>
          </div>
        </div>
      </section>
      <section className="about-features">
        <div className="container">
          <SectionTitle title="Основные особенности" />
          <Cards items={[
            { title: 'Уникальная внешность', text: 'Яйцевидная форма головы считается визитной карточкой породы' },
            { title: 'Высокий интеллект', text: 'Бультерьеры хорошо обучаются и быстро осваивают новые команды' },
            { title: 'Активность', text: 'Порода нуждается в регулярных прогулках и физических нагрузках' },
          ]} />
        </div>
      </section>
      <section className="timeline-section">
        <div className="container">
          <SectionTitle title="Развитие породы" />
          <div className="timeline">
            {[
              ['1850-е', 'Начало селекции', 'Первые эксперименты по созданию новой породы'],
              ['1860-е', 'Первые выставки', 'Бультерьер получает узнаваемость и популярность'],
              ['XX век', 'Семейный компаньон', 'Порода становится преданной собакой для активных владельцев'],
            ].map(([year, title, text]) => <div className="timeline-item reveal" key={year}><span>{year}</span><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>
    </>
  );
}

function CarePage() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');

  const calculateAge = () => {
    const dogAge = Number(age);
    if (!age && dogAge !== 0) {
      setResult('Возраст собаки');
      return;
    }

    setResult(`Примерный человеческий возраст: ${dogAge <= 2 ? dogAge * 12 : 24 + (dogAge - 2) * 4} лет`);
  };

  return (
    <>
      <PageHero title="Уход и содержание" text="Основные рекомендации по воспитанию и ежедневному уходу за бультерьером" />
      <section className="care-table-section">
        <div className="container">
          <SectionTitle title="Основные характеристики" />
          <div className="care-table-card reveal">
            {careRows.map(([name, value]) => <div className="care-row" key={name}><span>{name}</span><span>{value}</span></div>)}
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <SectionTitle title="Что важно помнить" />
          <div className="care-cards">
            {[
              ['Движение', 'Со бультерьером нужно гулять 2–3 раза в день примерно по 1 часу. Нельзя забывать про баланс между физическими и умственными нагрузками.'],
              ['Воспитание', 'Главная задача — стать лидером для собаки, проявить последовательность, твердость и уважение. Важно направить упрямство и охотничий инстинкт буля в мирное русло.'],
              ['Гигиена', 'Достаточно протирать лапы после прогулки, мыть собаку 1–2 раза в год, чистить уши еженедельно, стричь когти раз в месяц и проверять глаза. А ещё проверять, чтобы буль не грустил!'],
            ].map(([title, text]) => <div className="care-card reveal" key={title}><h3>{title}</h3><p>{text}</p></div>)}
          </div>
        </div>
      </section>
      <section className="age-section reveal">
        <div className="age-calculator">
          <h2>Калькулятор возраста</h2>
          <div className="age-input-group">
            <input type="number" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Возраст собаки" />
            <button className="btn" onClick={calculateAge}>Рассчитать</button>
          </div>
          <div className="age-result">{result}</div>
        </div>
      </section>
    </>
  );
}

function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(0);
  const photos = useMemo(() => (filter === 'all' ? galleryData : galleryData.filter((item) => item.category === filter)), [filter]);
  const shift = (direction) => setIndex((value) => (value + direction + photos.length) % photos.length);
  const chooseFilter = (value) => { setFilter(value); setIndex(0); };
  const visiblePhotos = [
    ['left', photos[(index - 1 + photos.length) % photos.length]],
    ['center', photos[index]],
    ['right', photos[(index + 1) % photos.length]],
  ];

  return (
    <>
      <PageHero title="Галерея" text="Взгляните на эти смешные мордочки своими глазами" />
      <section>
        <div className="container gallery-filters">
          {[
            ['all', 'Все'],
            ['puppy', 'Щенки'],
            ['adult', 'Взрослые'],
            ['play', 'Играющие'],
          ].map(([value, label]) => <button className={`filter-btn${filter === value ? ' active' : ''}`} key={value} onClick={() => chooseFilter(value)}>{label}</button>)}
        </div>
      </section>
      <section>
        <div className="container">
          <div className="gallery-carousel reveal">
            <button className="gallery-arrow gallery-prev" aria-label="Предыдущее фото" onClick={() => shift(-1)}>❮</button>
            <div className="gallery-circle">
              {visiblePhotos.map(([position, photo]) => <div className={`gallery-item ${position}`} key={`${position}-${photo.src}`}><img src={photo.src} alt={photo.alt} /></div>)}
            </div>
            <button className="gallery-arrow gallery-next" aria-label="Следующее фото" onClick={() => shift(1)}>❯</button>
          </div>
        </div>
      </section>
    </>
  );
}

function FactsPage() {
  const facts = ['Порода выведена в Англии в XIX веке', 'Були известны яйцеобразной формой головы', 'Отличается высоким интеллектом и упрямством', 'Буль очень привязан к хозяину', 'Були нуждаются в регулярной активности', 'Буль — отличный друг при правильном воспитании', 'Любит крутиться на месте', 'Були уже давно не собаки-убийцы'];
  const [fact, setFact] = useState('Нажмите кнопку, чтобы узнать что-то новое');
  const [factActive, setFactActive] = useState(false);
  const showFact = () => {
    setFact(facts[Math.floor(Math.random() * facts.length)]);
    setFactActive(true);
  };

  return (
    <>
      <PageHero title="Интересные факты" text="Необычные особенности одной из самых узнаваемых пород собак" />
      <section>
        <div className="container">
          <SectionTitle title="Случайный факт" />
          <div className="fact-generator reveal">
            <button className="btn" onClick={showFact}>Показать факт</button>
            <div className={factActive ? 'fact-text fact-card-active' : 'fact-text'}>{fact}</div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <SectionTitle title="Интересные особенности породы" />
          <div className="facts-list">
            {[
              ['🐾 Узнаваемый профиль', 'Яйцевидная форма головы делает породу одной из самых узнаваемых в мире'],
              ['🐾 Высокий интеллект', 'Бультерьеры быстро усваивают новые команды, несмоторя на своё упрямство'],
              ['🐾 Сильная привязанность', 'Очень ориентированы на человека, любят находиться рядом с семьёй и не выносят одиночества'],
              ['🐾 Энергичность', 'Разнесут половину дома, если ненароком заскучают. Любят крутиться волчком под дабстеп'],
            ].map(([title, text]) => <React.Fragment key={title}><h3>{title}</h3><p>{text}</p></React.Fragment>)}
          </div>
        </div>
      </section>
      <section className="quiz">
        <Quiz
          title="Небольшая викторина"
          questions={factsQuiz}
          finalResult={(score, total) => (
            <>
              <h3>Ваш результат</h3>
              <p>{score === total ? 'Идеально! Вы отлично знаете породу 🐾' : score >= 2 ? 'Хороший результат! Вы неплохо разбираетесь в породе' : 'Есть время узнать побольше о бультерьерах!'}</p>
              <p>Правильных ответов: {score} / {total}</p>
            </>
          )}
        />
      </section>
    </>
  );
}

function ContactsPage() {
  return (
    <>
      <PageHero title="Контакты" text="Позвоните, если захочется поболтать о бультерьерах" />
      <section>
        <div className="container">
          <SectionTitle title="Контактная информация" />
          <div className="contacts-grid reveal">
            <div className="contact-card"><h3>Email</h3><p><a href="mailto:lesikpost@gmail.com">lesikpost@gmail.com</a></p></div>
            <div className="contact-card"><h3>Телефон</h3><p>+7 (922) 259-90-52</p></div>
            <div className="contact-card"><h3>Город</h3><p>Санкт-Петербург</p></div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <SectionTitle title="Автор проекта" />
          <div className="author-card reveal">
            <div className="author-photo"><img src="images/author.jpg" alt="Автор проекта" /></div>
            <div className="author-info"><h3>Фролова Алёна Алексеевна</h3><br /><p>Студент группы 4326</p><p>Курсовая работа по дисциплине «Web-технологии»</p><p>Тема проекта: «Бультерьер: всё о собаке»</p><p>ГУАП</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

const pageComponents = {
  home: HomePage,
  about: AboutPage,
  care: CarePage,
  gallery: GalleryPage,
  facts: FactsPage,
  contacts: ContactsPage,
};

function App() {
  const [page, navigate] = useCurrentPage();
  const Page = pageComponents[page] || HomePage;

  useScrollReveal(page);

  useEffect(() => {
    const pageMeta = metadata[page] || metadata.home;
    document.title = pageMeta.title;
    setMetaTag('description', pageMeta.description);
    setMetaTag('keywords', pageMeta.keywords);
  }, [page]);

  return (
    <>
      <Header navigate={navigate} />
      <main className="page-shell" key={page}><Page navigate={navigate} /></main>
      <Footer />
      <TopButton />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

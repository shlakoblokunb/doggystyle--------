const { useEffect, useMemo, useState } = React;

const pages = [
  { id: 'home', label: 'Главная', href: 'index.html' },
  { id: 'about', label: 'О породе', href: 'about.html' },
  { id: 'care', label: 'Уход', href: 'care.html' },
  { id: 'gallery', label: 'Галерея', href: 'gallery.html' },
  { id: 'facts', label: 'Факты', href: 'facts.html' },
  { id: 'contacts', label: 'Контакты', href: 'contacts.html' },
];

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


function setMetaTag(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);

  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function useScrollReveal(page) {
  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');

    if (!elements.length) return undefined;

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('active'));
      return undefined;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [page]);
}

function pageFromPath(pathname) {
  const file = pathname.split('/').pop() || 'index.html';
  if (file === 'index.html' || file === '') return 'home';
  return file.replace('.html', '') || 'home';
}

function useCurrentPage() {
  const [page, setPage] = useState(() => pageFromPath(window.location.pathname));

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const navigate = (event, href) => {
    event.preventDefault();
    window.history.pushState({}, '', href);
    setPage(pageFromPath(href));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return [page, navigate];
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
      <button className="burger" id="burger" aria-label="Открыть меню" onClick={() => setOpen((value) => !value)}>
        ☰
      </button>
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
    const handleScroll = () => setVisible(window.scrollY > 500);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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

function HomePage({ navigate }) {
  const [countersStarted, setCountersStarted] = useState(false);
  const [counterValues, setCounterValues] = useState([0, 0, 0]);
  const quizData = useMemo(() => [
    { q: 'Готовы к активным прогулкам каждый день?', a: [{ text: 'Да', score: 2 }, { text: 'Нет', score: 0 }] },
    { q: 'У вас есть опыт воспитания собак?', a: [{ text: 'Да', score: 1 }, { text: 'Нет', score: 0 }] },
    { q: 'Готовы уделять много времени воспитанию?', a: [{ text: 'Да', score: 2 }, { text: 'Нет', score: 0 }] },
  ], []);
  const [quizStep, setQuizStep] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const stats = document.querySelector('.stats');
    const startCounters = () => {
      if (countersStarted || !stats || stats.getBoundingClientRect().top >= window.innerHeight - 100) return;
      setCountersStarted(true);
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
  }, [countersStarted]);

  const answerQuiz = (score) => {
    const nextScore = quizScore + score;
    setQuizScore(nextScore);
    if (quizStep + 1 < quizData.length) setQuizStep((step) => step + 1);
    else setFinished(true);
  };

  const restartQuiz = () => {
    setQuizStep(0);
    setQuizScore(0);
    setFinished(false);
  };

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
          <div className="cards">
            <article className="card reveal"><div className="pink-square">❤</div><h3>Преданность</h3><p>Сильная привязанность к семье</p></article>
            <article className="card reveal"><div className="pink-square">⚡</div><h3>Активность</h3><p>Любит движение и игры</p></article>
            <article className="card reveal"><div className="pink-square">🧠</div><h3>Интеллект</h3><p>Быстро обучается</p></article>
          </div>
        </div>
      </section>

      <section className="stats">
        {[
          ['лет жизни', counterValues[0]],
          ['кг веса', counterValues[1]],
          ['% любви к хозяину', counterValues[2]],
        ].map(([label, value]) => (
          <div className="stat" key={label}><h3 className="counter">{value}</h3><p>{label}</p></div>
        ))}
      </section>

      <section className="features reveal">
        <div className="container">
          <div><h2>Собака с уникальным характером</h2><p>Бультерьер — добрый и энергичный компаньон</p></div>
          <div><img src="images/feature-dog.jpg" alt="Бультерьер" className="feature-img" /></div>
        </div>
      </section>

      <section className="reveal">
        <div className="quiz-box">
          <h2 className="quiz-title">Подходит ли вам бультерьер?</h2>
          {!finished ? (
            <>
              <div className="quiz-question">{quizData[quizStep].q}</div>
              <div className="quiz-buttons">
                {quizData[quizStep].a.map((answer) => <button className="btn" key={answer.text} onClick={() => answerQuiz(answer.score)}>{answer.text}</button>)}
              </div>
            </>
          ) : (
            <>
              <div className="quiz-result-card">{quizScore >= 4 ? 'Кажется, бультерьер вам подходит!' : 'Стоит рассмотреть более спокойные породы'}</div>
              <button className="btn quiz-restart" onClick={restartQuiz}>Пройти заново</button>
            </>
          )}
        </div>
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
          <div className="cards">
            <article className="card reveal"><h3>Уникальная внешность</h3><p>Яйцевидная форма головы считается визитной карточкой породы</p></article>
            <article className="card reveal"><h3>Высокий интеллект</h3><p>Бультерьеры хорошо обучаются и быстро осваивают новые команды</p></article>
            <article className="card reveal"><h3>Активность</h3><p>Порода нуждается в регулярных прогулках и физических нагрузках</p></article>
          </div>
        </div>
      </section>
      <section className="timeline-section">
        <div className="container">
          <SectionTitle title="Развитие породы" />
          <div className="timeline">
            <div className="timeline-item reveal"><span>1850-е</span><h3>Начало селекции</h3><p>Первые эксперименты по созданию новой породы</p></div>
            <div className="timeline-item reveal"><span>1860-е</span><h3>Первые выставки</h3><p>Бультерьер получает узнаваемость и популярность</p></div>
            <div className="timeline-item reveal"><span>XX век</span><h3>Семейный компаньон</h3><p>Порода становится преданной собакой для активных владельцев</p></div>
          </div>
        </div>
      </section>
    </>
  );
}

function CarePage() {
  const [age, setAge] = useState('');
  const [result, setResult] = useState('');
  const rows = [['Страна происхождения', 'Англия'], ['Группа FCI', 'Терьеры'], ['Рост', '30–45 см'], ['Вес', '20–35 кг'], ['Продолжительность жизни', '12–14 лет'], ['Шерсть', 'Короткая, гладкая'], ['Темперамент', 'Энергичный, преданный, смелый'], ['Назначение', 'Компаньон']];
  const calculateAge = () => {
    const numericAge = Number(age);
    if (!age && numericAge !== 0) { setResult('Возраст собаки'); return; }
    const humanAge = numericAge <= 2 ? numericAge * 12 : 24 + (numericAge - 2) * 4;
    setResult(`Примерный человеческий возраст: ${humanAge} лет`);
  };

  return (
    <>
      <PageHero title="Уход и содержание" text="Основные рекомендации по воспитанию и ежедневному уходу за бультерьером" />
      <section className="care-table-section"><div className="container"><SectionTitle title="Основные характеристики" /><div className="care-table-card reveal">{rows.map(([name, value]) => <div className="care-row" key={name}><span>{name}</span><span>{value}</span></div>)}</div></div></section>
      <section><div className="container"><SectionTitle title="Что важно помнить" /><div className="care-cards">
        <div className="care-card reveal"><h3>Движение</h3><p>Со бультерьером нужно гулять 2–3 раза в день примерно по 1 часу. Нельзя забывать про баланс между физическими и умственными нагрузками.</p></div>
        <div className="care-card reveal"><h3>Воспитание</h3><p>Главная задача — стать лидером для собаки, проявить последовательность, твердость и уважение. Важно направить упрямство и охотничий инстинкт буля в мирное русло.</p></div>
        <div className="care-card reveal"><h3>Гигиена</h3><p>Достаточно протирать лапы после прогулки, мыть собаку 1–2 раза в год, чистить уши еженедельно, стричь когти раз в месяц и проверять глаза. А ещё проверять, чтобы буль не грустил!</p></div>
      </div></div></section>
      <section className="age-section reveal"><div className="age-calculator"><h2>Калькулятор возраста</h2><div className="age-input-group"><input type="number" value={age} onChange={(event) => setAge(event.target.value)} placeholder="Возраст собаки" /><button className="btn" onClick={calculateAge}>Рассчитать</button></div><div className="age-result">{result}</div></div></section>
    </>
  );
}

const galleryData = [
  { src: 'images/gallery1.jpg', category: 'puppy', alt: 'Щенок' }, { src: 'images/gallery2.jpg', category: 'puppy', alt: 'Щенок' }, { src: 'images/gallery3.jpg', category: 'puppy', alt: 'Щенок' }, { src: 'images/gallery13.jpg', category: 'puppy', alt: 'Щенок' },
  { src: 'images/gallery4.jpg', category: 'adult', alt: 'Взрослый' }, { src: 'images/gallery5.jpg', category: 'adult', alt: 'Взрослый' }, { src: 'images/gallery6.jpg', category: 'adult', alt: 'Взрослый' }, { src: 'images/gallery10.jpg', category: 'adult', alt: 'Взрослый' }, { src: 'images/gallery11.jpg', category: 'adult', alt: 'Взрослый' },
  { src: 'images/gallery7.jpg', category: 'play', alt: 'Игра' }, { src: 'images/gallery8.jpg', category: 'play', alt: 'Игра' }, { src: 'images/gallery9.jpg', category: 'play', alt: 'Игра' }, { src: 'images/gallery12.jpg', category: 'play', alt: 'Игра' },
];

function GalleryPage() {
  const [filter, setFilter] = useState('all');
  const [index, setIndex] = useState(0);
  const currentGallery = filter === 'all' ? galleryData : galleryData.filter((item) => item.category === filter);
  const getPrev = (i) => (i - 1 + currentGallery.length) % currentGallery.length;
  const getNext = (i) => (i + 1) % currentGallery.length;
  const items = [{ pos: 'left', data: currentGallery[getPrev(index)] }, { pos: 'center', data: currentGallery[index] }, { pos: 'right', data: currentGallery[getNext(index)] }];
  const chooseFilter = (value) => { setFilter(value); setIndex(0); };

  return (
    <>
      <PageHero title="Галерея" text="Взгляните на эти смешные мордочки своими глазами" />
      <section><div className="container gallery-filters">{[['all', 'Все'], ['puppy', 'Щенки'], ['adult', 'Взрослые'], ['play', 'Играющие']].map(([value, label]) => <button className={`filter-btn${filter === value ? ' active' : ''}`} key={value} onClick={() => chooseFilter(value)}>{label}</button>)}</div></section>
      <section><div className="container"><div className="gallery-carousel reveal"><button className="gallery-arrow gallery-prev" aria-label="Предыдущее фото" onClick={() => setIndex(getPrev(index))}>❮</button><div className="gallery-circle">{items.map((item) => <div className={`gallery-item ${item.pos}`} key={`${item.pos}-${item.data.src}`}><img src={item.data.src} alt={item.data.alt} /></div>)}</div><button className="gallery-arrow gallery-next" aria-label="Следующее фото" onClick={() => setIndex(getNext(index))}>❯</button></div></div></section>
    </>
  );
}

function FactsPage() {
  const facts = ['Порода выведена в Англии в XIX веке', 'Були известны яйцеобразной формой головы', 'Отличается высоким интеллектом и упрямством', 'Буль очень привязан к хозяину', 'Були нуждаются в регулярной активности', 'Буль — отличный друг при правильном воспитании', 'Любит крутиться на месте', 'Були уже давно не собаки-убийцы'];
  const [fact, setFact] = useState('Нажмите кнопку, чтобы узнать что-то новое');
  const [factActive, setFactActive] = useState(false);
  const quizData = [
    { q: 'В какой стране была выведена порода бультерьер?', a: [{ text: 'Германия', correct: false }, { text: 'Англия', correct: true }, { text: 'Франция', correct: false }] },
    { q: 'Какой главный признак породы?', a: [{ text: 'Яйцевидная голова', correct: true }, { text: 'Длинные уши', correct: false }, { text: 'Кудрявая шерсть', correct: false }] },
    { q: 'Бультерьер — это в первую очередь:', a: [{ text: 'Охотничья собака', correct: false }, { text: 'Служебная собака', correct: false }, { text: 'Собака-компаньон', correct: true }] },
  ];
  const [step, setStep] = useState(0);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const showFact = () => { setFact(facts[Math.floor(Math.random() * facts.length)]); setFactActive(true); };
  const answer = (correct) => {
    const nextScore = correct ? score + 1 : score;
    setScore(nextScore);
    if (step + 1 < quizData.length) setStep((value) => value + 1);
    else setDone(true);
  };

  return (
    <>
      <PageHero title="Интересные факты" text="Необычные особенности одной из самых узнаваемых пород собак" />
      <section><div className="container"><SectionTitle title="Случайный факт" /><div className="fact-generator reveal"><button className="btn" onClick={showFact}>Показать факт</button><div className={factActive ? 'fact-text fact-card-active' : 'fact-text'}>{fact}</div></div></div></section>
      <section><div className="container"><SectionTitle title="Интересные особенности породы" /><div className="facts-list">
        <h3>🐾 Узнаваемый профиль</h3><p>Яйцевидная форма головы делает породу одной из самых узнаваемых в мире</p>
        <h3>🐾 Высокий интеллект</h3><p>Бультерьеры быстро усваивают новые команды, несмоторя на своё упрямство</p>
        <h3>🐾 Сильная привязанность</h3><p>Очень ориентированы на человека, любят находиться рядом с семьёй и не выносят одиночества</p>
        <h3>🐾 Энергичность</h3><p>Разнесут половину дома, если ненароком заскучают. Любят крутиться волчком под дабстеп</p>
      </div></div></section>
      <section className="quiz"><div className="quiz-box"><h2>Небольшая викторина</h2>{!done ? <><div className="quiz-question">{quizData[step].q}</div><div className="quiz-buttons">{quizData[step].a.map((item) => <button className="btn" key={item.text} onClick={() => answer(item.correct)}>{item.text}</button>)}</div></> : <div className="quiz-result-card"><h3>Ваш результат</h3><p>{score === quizData.length ? 'Идеально! Вы отлично знаете породу 🐾' : score >= 2 ? 'Хороший результат! Вы неплохо разбираетесь в породе' : 'Есть время узнать побольше о бультерьерах!'}</p><p>Правильных ответов: {score} / {quizData.length}</p></div>}</div></section>
    </>
  );
}

function ContactsPage() {
  return (
    <>
      <PageHero title="Контакты" text="Позвоните, если захочется поболтать о бультерьерах" />
      <section><div className="container"><SectionTitle title="Контактная информация" /><div className="contacts-grid reveal"><div className="contact-card"><h3>Email</h3><p><a href="mailto:lesikpost@gmail.com">lesikpost@gmail.com</a></p></div><div className="contact-card"><h3>Телефон</h3><p>+7 (922) 259-90-52</p></div><div className="contact-card"><h3>Город</h3><p>Санкт-Петербург</p></div></div></div></section>
      <section><div className="container"><SectionTitle title="Автор проекта" /><div className="author-card reveal"><div className="author-photo"><img src="images/author.jpg" alt="Автор проекта" /></div><div className="author-info"><h3>Фролова Алёна Алексеевна</h3><br /><p>Студент группы 4326</p><p>Курсовая работа по дисциплине «Web-технологии»</p><p>Тема проекта: «Бультерьер: всё о собаке»</p><p>ГУАП</p></div></div></div></section>
    </>
  );
}

function App() {
  const [page, navigate] = useCurrentPage();
  const CurrentPage = { home: HomePage, about: AboutPage, care: CarePage, gallery: GalleryPage, facts: FactsPage, contacts: ContactsPage }[page] || HomePage;

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
      <main className="page-shell" key={page}><CurrentPage navigate={navigate} /></main>
      <Footer />
      <TopButton />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Quiz Module for World History Timeline
// Generates questions from timeline data based on difficulty and user's content

class HistoryQuiz {
    constructor() {
        this.questions = [];
        this.currentIndex = 0;
        this.score = 0;
        this.answered = 0;
        this.results = [];
        this.isActive = false;
    }

    // Generate quiz questions from timeline data
    generateQuestions(count, difficulty, source) {
        const pool = this.buildQuestionPool(difficulty, source);
        // Shuffle and pick
        const shuffled = this.shuffle(pool);
        this.questions = shuffled.slice(0, Math.min(count, shuffled.length));
        this.currentIndex = 0;
        this.score = 0;
        this.answered = 0;
        this.results = [];
        this.isActive = true;
        return this.questions.length;
    }

    buildQuestionPool(difficulty, source) {
        const pool = [];
        let events = this.getSourceEvents(source);
        const entities = timelineData.entities || [];
        const references = timelineData.references || [];

        // Filter out periods for question generation (they're too generic)
        events = events.filter(e => e.category !== 'period' && !e.isPeriod);

        // Need at least a few events to generate questions
        if (events.length < 4) return pool;

        // 1. "When did X happen?" — date questions
        events.forEach(e => {
            if (e.year && e.title) {
                const q = this.makeDateQuestion(e, events, difficulty);
                if (q) pool.push(q);
            }
        });

        // 2. "What happened in year X?" — reverse date questions
        events.forEach(e => {
            if (e.year && e.title) {
                const q = this.makeReverseDateQuestion(e, events, difficulty);
                if (q) pool.push(q);
            }
        });

        // 3. "Which came first?" — ordering questions
        if (events.length >= 2) {
            for (let i = 0; i < Math.min(events.length, 20); i++) {
                const q = this.makeOrderingQuestion(events, difficulty);
                if (q) pool.push(q);
            }
        }

        // 4. "True or False" questions
        events.forEach(e => {
            if (e.description && e.title) {
                const q = this.makeTrueFalseQuestion(e, events, difficulty);
                if (q) pool.push(q);
            }
        });

        // 5. Entity identification questions
        entities.forEach(entity => {
            if (entity.type === 'state' && entity.description) {
                const q = this.makeEntityQuestion(entity, entities, difficulty);
                if (q) pool.push(q);
            }
        });

        return pool;
    }

    getSourceEvents(source) {
        let events = [...timelineData.events];
        if (source === 'user') {
            events = events.filter(e => e.userAdded);
        } else if (source === 'references') {
            // Get events linked to references
            const refEntityIds = new Set();
            timelineData.references.forEach(r => {
                if (r.entityIds) r.entityIds.forEach(id => refEntityIds.add(id));
            });
            events = events.filter(e =>
                e.entityIds && e.entityIds.some(id => refEntityIds.has(id))
            );
        }
        return events;
    }

    makeDateQuestion(event, allEvents, difficulty) {
        const correctYear = event.year;
        const distractors = this.generateYearDistractors(correctYear, difficulty);
        if (distractors.length < 3) return null;

        const options = this.shuffle([
            { text: this.formatYear(correctYear), correct: true },
            ...distractors.slice(0, 3).map(y => ({ text: this.formatYear(y), correct: false }))
        ]);

        return {
            type: 'Date',
            question: `When did "${event.title}" occur?`,
            options,
            explanation: event.description || `It occurred in ${this.formatYear(correctYear)}.`,
            difficulty
        };
    }

    makeReverseDateQuestion(event, allEvents, difficulty) {
        // Pick 3 other events as distractors
        const others = allEvents.filter(e => e.id !== event.id && e.title && e.category !== 'period');
        if (others.length < 3) return null;
        const distractorEvents = this.shuffle(others).slice(0, 3);

        const options = this.shuffle([
            { text: event.title, correct: true },
            ...distractorEvents.map(e => ({ text: e.title, correct: false }))
        ]);

        let yearDisplay = this.formatYear(event.year);
        if (event.endYear) {
            yearDisplay += ` - ${this.formatYear(event.endYear)}`;
        }

        return {
            type: 'Identification',
            question: `What happened around ${yearDisplay}?`,
            options,
            explanation: event.description || `"${event.title}" occurred around ${yearDisplay}.`,
            difficulty
        };
    }

    makeOrderingQuestion(events, difficulty) {
        // Pick 2 events with different years
        const usable = events.filter(e => e.year && e.title && e.category !== 'period');
        if (usable.length < 2) return null;

        const shuffled = this.shuffle(usable);
        const a = shuffled[0];
        const b = shuffled[1];
        if (a.year === b.year) return null;

        const earlier = a.year < b.year ? a : b;
        const later = a.year < b.year ? b : a;

        const options = [
            { text: earlier.title, correct: true },
            { text: later.title, correct: false }
        ];

        return {
            type: 'Chronology',
            question: `Which came first?`,
            options,
            explanation: `"${earlier.title}" (${this.formatYear(earlier.year)}) came before "${later.title}" (${this.formatYear(later.year)}).`,
            difficulty
        };
    }

    makeTrueFalseQuestion(event, allEvents, difficulty) {
        // Generate a true or false statement about the event
        const isTrue = Math.random() > 0.5;

        let statement;
        if (isTrue) {
            statement = `"${event.title}" occurred in the ${this.getCentury(event.year)}.`;
        } else {
            // Make a false statement by attributing it to wrong century
            const fakeCentury = this.getWrongCentury(event.year, difficulty);
            statement = `"${event.title}" occurred in the ${fakeCentury}.`;
        }

        const options = [
            { text: 'True', correct: isTrue },
            { text: 'False', correct: !isTrue }
        ];

        return {
            type: 'True or False',
            question: statement,
            options,
            explanation: `"${event.title}" occurred in ${this.formatYear(event.year)} (${this.getCentury(event.year)}).`,
            difficulty
        };
    }

    makeEntityQuestion(entity, allEntities, difficulty) {
        const sameType = allEntities.filter(e => e.type === entity.type && e.id !== entity.id);
        if (sameType.length < 3) return null;

        const distractors = this.shuffle(sameType).slice(0, 3);

        const options = this.shuffle([
            { text: entity.name, correct: true },
            ...distractors.map(e => ({ text: e.name, correct: false }))
        ]);

        return {
            type: 'Identification',
            question: `Which ${entity.type} is described as: "${entity.description}"?`,
            options,
            explanation: `${entity.name} (${this.formatYear(entity.year)}${entity.endYear ? ' - ' + this.formatYear(entity.endYear) : ''}).`,
            difficulty
        };
    }

    generateYearDistractors(correctYear, difficulty) {
        const distractors = new Set();
        const ranges = {
            beginner: [500, 1000, 2000],
            intermediate: [100, 250, 500],
            advanced: [25, 50, 100]
        };
        const offsets = ranges[difficulty] || ranges.intermediate;

        let attempts = 0;
        while (distractors.size < 3 && attempts < 20) {
            const offset = offsets[Math.floor(Math.random() * offsets.length)];
            const direction = Math.random() > 0.5 ? 1 : -1;
            const distractor = correctYear + (offset * direction);
            if (distractor !== correctYear && distractor >= -300000 && distractor <= 2026) {
                distractors.add(distractor);
            }
            attempts++;
        }

        return Array.from(distractors);
    }

    getCentury(year) {
        if (year === 0) year = 1;
        if (year < -1000) {
            const millennium = Math.ceil(Math.abs(year) / 1000);
            return `${millennium}${this.ordinalSuffix(millennium)} millennium BCE`;
        }
        if (year < 0) {
            const century = Math.ceil(Math.abs(year) / 100);
            return `${century}${this.ordinalSuffix(century)} century BCE`;
        }
        const century = Math.ceil(year / 100);
        return `${century}${this.ordinalSuffix(century)} century CE`;
    }

    getWrongCentury(year, difficulty) {
        const offsets = { beginner: 5, intermediate: 3, advanced: 1 };
        const offset = offsets[difficulty] || 3;
        const dir = Math.random() > 0.5 ? 1 : -1;
        const fakeYear = year + (offset * 100 * dir);
        return this.getCentury(fakeYear);
    }

    ordinalSuffix(n) {
        const v = n % 100;
        if (v >= 11 && v <= 13) return 'th';
        const r = n % 10;
        if (r === 1) return 'st';
        if (r === 2) return 'nd';
        if (r === 3) return 'rd';
        return 'th';
    }

    formatYear(year) {
        if (year < 0) return `${Math.abs(year)} BCE`;
        if (year === 0) return '1 CE';
        return `${year} CE`;
    }

    getCurrentQuestion() {
        return this.questions[this.currentIndex] || null;
    }

    answerQuestion(optionIndex) {
        const q = this.getCurrentQuestion();
        if (!q) return null;

        const selected = q.options[optionIndex];
        const isCorrect = selected.correct;
        if (isCorrect) this.score++;
        this.answered++;

        this.results.push({
            question: q.question,
            correct: isCorrect,
            selected: selected.text,
            correctAnswer: q.options.find(o => o.correct).text
        });

        return { isCorrect, explanation: q.explanation };
    }

    nextQuestion() {
        this.currentIndex++;
        return this.currentIndex < this.questions.length;
    }

    getResults() {
        const percent = this.questions.length > 0 ? Math.round((this.score / this.questions.length) * 100) : 0;
        return {
            score: this.score,
            total: this.questions.length,
            percent,
            grade: percent >= 80 ? 'excellent' : percent >= 50 ? 'good' : 'poor',
            results: this.results
        };
    }

    shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }
}

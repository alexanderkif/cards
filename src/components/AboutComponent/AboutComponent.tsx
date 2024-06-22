import { SVGIcons } from '@/types/types';
import SVGIcon from '../Icons/SVGIcons';
import './AboutComponent.scss';

function AboutComponent() {
  return (
    <div className="aboutComponent">
      <div className="fields">
        <div>
          <h1>Cards for training memory</h1>
          <p>
            Enhance your memory and learning with Cards, a free and versatile
            flashcard app designed to optimize your learning experience. Whether
            you're mastering a new language, expanding your vocabulary, or
            delving into any subject, Cards empowers you to learn efficiently
            and effectively.
          </p>
          <p>
            Create personalized groups of cards with ease, featuring terms,
            concepts, or any information you want to retain. Each card displays
            your chosen content on one side and its corresponding translation,
            definition, or relevant examples on the other.
          </p>
          <p>
            Leverage spaced repetition, a scientifically proven learning
            technique, to optimize your memory retention. Study anytime,
            anywhere, even without an internet connection. Embrace a
            user-friendly interface that makes learning a breeze. Cards'
            intuitive design and simple navigation ensure a distraction-free
            learning environment.
          </p>
          <p>Double click on the speaker icon to select a language.</p>
          <p>
            You can use HTML tags to format the card, such as &lt;b&gt; for bold
            text, &lt;i&gt; for italic text, &lt;sup&gt; for superscript,
            &lt;sub&gt; for subscript, &lt;br&gt; for a line break, and more.
          </p>
          <p>
            Wrap symbols in &lt;sup&gt; tag to define superscript text. For
            example, "a&lt;sup&gt;2&lt;/sup&gt;" will be shown as a<sup>2</sup>.
          </p>
          <p>
            Wrap symbols in &lt;sub&gt; tag to define subscript text. For
            example, "A&lt;sub&gt;2&lt;/sup&gt;" will be shown as A<sub>2</sub>.
          </p>
        </div>
        <div className="copyRihgt d-flex justify-content-between align-items-center">
          <span>&copy; Aleksandr Nikiforov, 2024</span>{' '}
          <span className="d-flex">
            <a
              href="https://www.linkedin.com/in/aleksandr-nikiforov-8a417712a/"
              target="blank"
            >
              <SVGIcon
                name={SVGIcons.linkedin}
                size="1.5rem"
                tooltip="LinkedIn"
                tooltipClass="svgTooltip-left"
              />
            </a>
            <a
              className="ms-2"
              href="https://github.com/alexanderkif"
              target="blank"
            >
              <SVGIcon
                name={SVGIcons.github}
                size="1.5rem"
                tooltip="GitHub"
                tooltipClass="svgTooltip-left"
              />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default AboutComponent;

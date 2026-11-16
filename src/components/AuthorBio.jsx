import React from 'react';
import { Mail, Sparkles, Code2, Palette, Cpu } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './SocialIcons';

export default function AuthorBio() {
  return (
    <section id="about" className="author-section">
      <div className="author-container">
        <div className="author-visual">
          <div className="author-avatar-frame">
            <img 
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80" 
              alt="Varshini M" 
              className="author-large-avatar" 
            />
            <div className="author-status-badge">
              <span className="status-indicator" />
              <span>Writing &amp; Building</span>
            </div>
          </div>
        </div>

        <div className="author-content">
          <div className="author-pill">
            <Sparkles size={14} />
            <span>Meet the Author</span>
          </div>

          <h2 className="author-heading">
            Hi, I'm <span className="gradient-text">Varshini M</span>.
          </h2>

          <p className="author-lead">
            I'm a passionate frontend engineer and editorial tech writer dedicated to exploring the intersection 
            of resilient web architectures, generative user interfaces, and empathetic design craft.
          </p>

          <p className="author-subtext">
            Varshini Blog was born out of a desire to document architectural real-world patterns that withstand the test 
            of rapid framework iterations. From reactive primitives in React 19 to fluid typography and micro-interactions, 
            every article here is grounded in real production practices.
          </p>

          {/* Pillars */}
          <div className="author-pillars">
            <div className="pillar-item">
              <Code2 size={18} className="pillar-icon" />
              <div>
                <strong>Modern Architecture</strong>
                <p>Component hierarchies &amp; state management</p>
              </div>
            </div>

            <div className="pillar-item">
              <Palette size={18} className="pillar-icon" />
              <div>
                <strong>Design Precision</strong>
                <p>Fluid typography &amp; micro-interactions</p>
              </div>
            </div>

            <div className="pillar-item">
              <Cpu size={18} className="pillar-icon" />
              <div>
                <strong>High Performance</strong>
                <p>Zero-jank 60fps &amp; sub-second page loads</p>
              </div>
            </div>
          </div>

          {/* Social Row */}
          <div className="author-socials">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noreferrer" 
              className="author-social-link"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <GithubIcon size={18} />
              <span>GitHub</span>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noreferrer" 
              className="author-social-link"
              title="LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <LinkedinIcon size={18} />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="author-social-link"
              title="Twitter / X"
              aria-label="Twitter Profile"
            >
              <TwitterIcon size={18} />
              <span>Twitter / X</span>
            </a>
            <a 
              href="mailto:contact@varshiniblog.dev" 
              className="author-social-link"
              title="Email Inquiry"
              aria-label="Email Inquiry"
            >
              <Mail size={18} />
              <span>Contact</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

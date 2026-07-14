/**
 * @vitest-environment jsdom
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { PageHtmlRenderer } from '../PageHtmlRenderer';

describe('PageHtmlRenderer', () => {
  it('renders standard HTML copy directly', () => {
    const html = '<div class="test-class">Hello World</div>';
    const { container } = render(<PageHtmlRenderer html={html} />);
    expect(container.textContent).toBe('Hello World');
    expect(container.querySelector('.test-class')).not.toBeNull();
  });

  it('renders registered shortcode widgets', () => {
    const html = '<div>Before widget</div>[MyWidget]<div>After widget</div>';
    const widgets = {
      MyWidget: <span data-testid="widget-element">Widget Content</span>,
    };
    render(<PageHtmlRenderer html={html} widgets={widgets} />);
    
    expect(screen.getByText('Before widget')).toBeInTheDocument();
    expect(screen.getByTestId('widget-element')).toBeInTheDocument();
    expect(screen.getByText('After widget')).toBeInTheDocument();
  });

  it('ignores unregistered shortcodes and renders them as text', () => {
    const html = '<div>[UnregisteredWidget]</div>';
    const { container } = render(<PageHtmlRenderer html={html} widgets={{}} />);
    expect(container.textContent).toBe('[UnregisteredWidget]');
  });

  it('completely ignores Tailwind CSS arbitrary bracket values in class attributes', () => {
    const html = `
      <section class="relative pt-20 lg:pt-28">
        <h1 class="text-5xl lg:text-[5rem] font-bold text-[#F0EDE8] leading-[1.0] tracking-[0.2em] mb-0">
          AI Skills
        </h1>
      </section>
    `;
    const widgets = {
      MyWidget: <span data-testid="widget-element">Widget Content</span>,
    };

    const { container } = render(<PageHtmlRenderer html={html} widgets={widgets} />);
    
    // The h1 text should render properly
    expect(screen.getByText('AI Skills')).toBeInTheDocument();

    // The h1 tag itself should have all the classes intact, proving it was not split or corrupted by the parser
    const h1 = container.querySelector('h1');
    expect(h1).not.toBeNull();
    expect(h1).toHaveClass('text-5xl');
    expect(h1).toHaveClass('lg:text-[5rem]');
    expect(h1).toHaveClass('text-[#F0EDE8]');
    expect(h1).toHaveClass('leading-[1.0]');
    expect(h1).toHaveClass('tracking-[0.2em]');
  });
});

/* eslint no-unused-expressions:0 */

import React from 'react';
import ReactDOM from 'react-dom';

import UIProgressiveDisclosure from './index';
import conformanceChecker from '../UIUtils/conform';
import noop from '../UIUtils/noop';

import sinon from 'sinon';

describe('UIProgressiveDisclosure component', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const render = vdom => ReactDOM.render(vdom, mountNode);
    const event = {preventDefault: noop};

    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    it('conforms to the UIKit prop interface standards', () => conformanceChecker(render, UIProgressiveDisclosure));

    describe('accepts', () => {
        it('a teaser string', () => {
            const element = render(<UIProgressiveDisclosure teaser='foo' />);

            expect(element.refs.toggle.textContent).toBe('foo');
        });

        it('a teaser element', () => {
            const element = render(<UIProgressiveDisclosure teaser={<p>foo</p>} />);

            expect(element.refs.toggle.textContent).toBe('foo');
        });

        it('string content', () => {
            const element = render(<UIProgressiveDisclosure expanded={true}>foo</UIProgressiveDisclosure>);

            expect(element.refs.content.textContent).toBe('foo');
        });

        it('element content', () => {
            const element = render(<UIProgressiveDisclosure expanded={true}><p>foo</p></UIProgressiveDisclosure>);

            expect(element.refs.content.textContent).toBe('foo');
        });

        it('arbitrary HTML attributes via props.toggleProps', () => {
            const element = render(<UIProgressiveDisclosure toggleProps={{'data-foo': 'bar'}} />);
            const node = element.refs.toggle;

            expect(node.getAttribute('data-foo')).toBe('bar');
        });

        it('additional classes via props.toggleProps.className', () => {
            const element = render(<UIProgressiveDisclosure toggleProps={{className: 'foo'}} />);
            const node = element.refs.toggle;

            expect(node.classList.contains('foo')).toBe(true);
        });
    });

    describe('CSS hook', () => {
        it('renders .ui-disclosure', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            expect(node.classList.contains('ui-disclosure')).toBe(true);
        });

        it('renders .ui-disclosure-expanded when `props.expanded` is `true`', () => {
            const element = render(<UIProgressiveDisclosure expanded={true} />);
            const node = element.refs.wrapper;

            expect(node.classList.contains('ui-disclosure-expanded')).toBe(true);
        });

        it('does not render .ui-disclosure-expanded when `props.expanded` is falsy', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            expect(node.classList.contains('ui-disclosure-expanded') === false).toBe(true);
        });
    });

    describe('teaser', () => {
        it('renders the content in props.teaser while unexpanded', () => {
            const element = render(<UIProgressiveDisclosure teaser='foo' />);

            expect(element.refs.toggle.textContent).toBe('foo');
        });

        it('accepts JSX', () => {
            const element = render(<UIProgressiveDisclosure teaser={<p>foo</p>} teaserExpanded={<p>bar</p>} />);
            const node = element.refs.wrapper;

            expect(element.refs.toggle.textContent).toBe('foo');

            element.handleClick();

            expect(element.refs.toggle.textContent).toBe('bar');
            expect(node.classList.contains('ui-disclosure-expanded')).toBe(true);
        });

        it('renders the content in props.teaserExpanded while expanded', () => {
            const element = render(<UIProgressiveDisclosure teaser='foo' teaserExpanded='bar' />);
            const node = element.refs.wrapper;

            expect(element.refs.toggle.textContent).toBe('foo');

            element.handleClick();

            expect(element.refs.toggle.textContent).toBe('bar');
            expect(node.classList.contains('ui-disclosure-expanded')).toBe(true);
        });

        it('renders the content in props.teaser while expanded if props.teaserExpanded is not provided', () => {
            const element = render(<UIProgressiveDisclosure teaser='foo' />);
            const node = element.refs.wrapper;

            expect(element.refs.toggle.textContent).toBe('foo');

            element.handleClick();

            expect(element.refs.toggle.textContent).toBe('foo');
            expect(node.classList.contains('ui-disclosure-expanded')).toBe(true);
        });
    });

    describe('click on the toggle', () => {
        it('shows and hides the content', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            element.handleClick();
            expect(node.classList.contains('ui-disclosure-expanded')).toBe(true);

            element.handleClick();
            expect(node.classList.contains('ui-disclosure-expanded') === false).toBe(true);
        });

        it('proxies the event to `props.toggleProps.onClick` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIProgressiveDisclosure toggleProps={{onClick: stub}} />);

            element.handleClick(event);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(event)).toBe(true);
        });
    });

    describe('enter key on the toggle', () => {
        it('shows and hides the content', () => {
            const element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            element.handleKeyDown({key: 'Enter', preventDefault: noop});
            expect(node.classList.contains('ui-disclosure-expanded')).toBe(true);

            element.handleKeyDown({key: 'Enter', preventDefault: noop});
            expect(node.classList.contains('ui-disclosure-expanded') === false).toBe(true);
        });

        it('proxies the event to `props.toggleProps.onKeyDown` if provided', () => {
            const stub = sandbox.stub();
            const element = render(<UIProgressiveDisclosure toggleProps={{onKeyDown: stub}} />);

            element.handleKeyDown(event);

            expect(stub.calledOnce).toBe(true);
            expect(stub.calledWithMatch(event)).toBe(true);
        });
    });

    describe('rerendering with a changed `props.expanded`', () => {
        it('shows and hides the content', () => {
            let element = render(<UIProgressiveDisclosure />);
            const node = element.refs.wrapper;

            expect(node.classList.contains('ui-disclosure-expanded') === false).toBe(true);

            element = render(<UIProgressiveDisclosure expanded />);
            expect(node.classList.contains('ui-disclosure-expanded')).toBe(true);
        });

        it('calls `props.onExpand` if `props.expanded` is now true', () => {
            const stub = sandbox.stub();
            let element = render(<UIProgressiveDisclosure onExpand={stub} />);

            expect(stub.called).toBe(false);

            element = render(<UIProgressiveDisclosure onExpand={stub} expanded />);
            expect(stub.calledOnce).toBe(true);
        });

        it('calls `props.onHide` if `props.expanded` is now false', () => {
            const stub = sandbox.stub();
            let element = render(<UIProgressiveDisclosure onHide={stub} expanded />);

            expect(stub.called).toBe(false);

            element = render(<UIProgressiveDisclosure onHide={stub} />);
            expect(stub.calledOnce).toBe(true);
        });
    });

    describe('onExpand', () => {
        it('is called when the disclosure is expanded', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onExpand={stub} />);

            element.handleClick();

            expect(stub.calledOnce).toBe(true);
        });

        it('is not called on first render if `props.expanded` is `true`', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onExpand={stub} expanded={true} />);

            expect(stub.called).toBe(false);
        });
    });

    describe('onHide', () => {
        it('is called when the disclosure is hidden', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onHide={stub} />);

            element.handleClick();
            element.handleClick();

            expect(stub.calledOnce).toBe(true);
        });

        it('is not called on first render if `props.expanded` is falsy', () => {
            const stub = sandbox.spy();
            const element = render(<UIProgressiveDisclosure onExpand={stub} />);

            expect(stub.called).toBe(false);
        });
    });
});
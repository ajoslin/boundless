/* eslint no-unused-expressions:0 */

import UIModal from './index';
import React from 'react';
import ReactDOM from 'react-dom';

describe('UIModal', () => {
    const mountNode = document.body.appendChild(document.createElement('div'));
    const sandbox = sinon.sandbox.create();

    afterEach(() => {
        ReactDOM.unmountComponentAtNode(mountNode);
        sandbox.restore();
    });

    describe('accepts', () => {
        it('React-supported HTML attributes as passthrough attributes to the wrapper node', () => {
            const modal = ReactDOM.render(<UIModal wrapperAttributes={{ 'data-id': 'foo' }} />, mountNode);
            const node = ReactDOM.findDOMNode(modal);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the dialog node', () => {
            const modal = ReactDOM.render(<UIModal data-id='foo' />, mountNode);
            const node = ReactDOM.findDOMNode(modal.refs.dialog);

            expect(node.getAttribute('data-id')).to.equal('foo');
        });

        it('React-supported HTML attributes as passthrough attributes to the mask node', () => {
            const modal = ReactDOM.render(<UIModal maskAttributes={{ 'data-id': 'foo' }} />, mountNode);

            expect(modal.refs.mask.getAttribute('data-id')).to.equal('foo');
        });

        it('an additional class as a string without replacing the core hook', () => {
            const modal = ReactDOM.render(<UIModal className='foo bar' />, mountNode);
            const node = ReactDOM.findDOMNode(modal.refs.dialog);

            ['ui-modal', 'foo', 'bar'].forEach(cname => assert(node.classList.contains(cname)));
        });
    });

    describe('CSS hook', () => {
        let modal;

        beforeEach(() => {
            modal = ReactDOM.render(<UIModal />, mountNode);
        });

        it('ui-modal is rendered', () => {
            assert(ReactDOM.findDOMNode(modal.refs.dialog).classList.contains('ui-modal'));
        });

        it('ui-modal-mask is rendered', () => {
            assert(modal.refs.mask.classList.contains('ui-modal-mask'));
        });

        it('ui-modal-wrapper is rendered', () => {
            assert(ReactDOM.findDOMNode(modal).classList.contains('ui-modal-wrapper'));
        });
    });
});

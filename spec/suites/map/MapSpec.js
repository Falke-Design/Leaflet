import {expect} from 'chai';
import sinon from 'sinon';
import {createContainer, removeMapContainer} from '../SpecHelper.js';

describe('Map', () => {
	let container,
	    map;

	beforeEach(() => {
		container = container = createContainer();
		map = new Map(container);
	});

	afterEach(() => {
		removeMapContainer(map, container);
	});

	describe('#invalidateSize', () => {
		const origWidth = 100;
		let clock;

		beforeEach(() => {
			container.style.height = '100px';
			container.style.width = `${origWidth}px`;
			map.setView([0, 0], 0);
			map.invalidateSize({pan: false});
			clock = sinon.useFakeTimers({
				toFake: ['setTimeout', 'clearTimeout', 'Date']
			});
		});

		afterEach(() => {
			clock.restore();
		});

		it('pans by the right amount when growing in 1px increments', () => {
			container.style.width = `${origWidth + 1}px`;
			map.invalidateSize();
			expect(map._getMapPanePos().x).to.equal(1);

			container.style.width = `${origWidth + 2}px`;
			map.invalidateSize();
			expect(map._getMapPanePos().x).to.equal(1);

			container.style.width = `${origWidth + 3}px`;
			map.invalidateSize();
			expect(map._getMapPanePos().x).to.equal(2);
		});
	});

});

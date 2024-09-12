export default defineNuxtPlugin(({ vueApp }) => {
	function intersectingClass() {
		vueApp.directive('inter-class', {
			mounted(el, { value, modifiers }) {
				try {
					const options = {
						threshold: value.threshold ?? 0,
						rootMargin: value.rootMargin ?? '0px',
					};

					function setStyleAttributes(entries) {
						if (entries[0].isIntersecting) {
							el.classList.add(value.class);
						}
						else if (!modifiers.once) {
							el.classList.remove(value.class);
						}
					}

					new IntersectionObserver(setStyleAttributes, options).observe(el);
				}
				catch (error) {
					console.warn(error);
				}
			},
		});
	}

	function noLineBreak() {
		function addNbsp(value) {
			return value ? value.replace(/(\s[а-яa-z]{1,2})\s+/ig, '$1&nbsp;') : value;
		}

		vueApp.directive('nbsp', {
			mounted(el) {
				el.innerHTML = addNbsp(el.innerHTML);
			},
			update(el) {
				el.innerHTML = addNbsp(el.innerHTML);
			},
		});
	}

	function stripTags() {
		function stripTags(string) {
			if (string) {
				return string.replace(/<{1}\/*(?!b|em|i|small|strong|sub|sup|ins|del|mark)(\b([a-z0-9]+)\b)\/*>{1}/gm, '');
			}
			else {
				return string;
			}
		}

		vueApp.directive('strip-tags', {
			mounted(el) {
				el.innerHTML = stripTags(el.innerHTML);
			},
			update(el) {
				el.innerHTML = stripTags(el.innerHTML);
			},
		});
	}

	function formatNumber() {
		function addSpace(num) {
			if (!num) {
				return num;
			}
			num = String(num);
			if (num.includes('.')) {
				num = num.split('.');
				return `${num[0].replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}.${num[1]}`;
			}
			else {
				return num.replace(/(\d)(?=(\d{3})+$)/g, '$1 ');
			}
		}

		vueApp.directive('format-number', {
			mounted(el) {
				el.innerHTML = addSpace(el.innerHTML);
			},
			update(el) {
				el.innerHTML = addSpace(el.innerHTML);
			},
		});
	}

	function brBreak() {
		function addBrBrake(el) {
			const array = el.innerHTML.replace(/<br\s\/>|<br>/gi, '<br/>').split('<br/>');
			el.innerHTML = '';
			return array.forEach((item, index) => {
				const span = document.createElement('span');
				span.setAttribute('data-text', item);
				span.style.setProperty('--i', index);
				span.innerHTML = item;
				el.appendChild(span);
			});
		}

		vueApp.directive('br-break', {
			mounted(el) {
				addBrBrake(el);
			},
			update(el) {
			},
		});
	}

	function extraSpace() {
		function addExtraSpace(text) {
			return text.replace(/\s/g, '&nbsp&nbsp');
		}

		vueApp.directive('extra-space', {
			mounted(el) {
				el.innerHTML = addExtraSpace(el.innerHTML);
			},
			update(el) {
			},
		});
	}

	function formatPhone() {
		function getFormatted(phone) {
			return `tel:${phone?.replace(/[\s-()]/g, '')}`;
		}

		vueApp.directive('format-phone', {
			mounted(el) {
				el.setAttribute('href', getFormatted(el.innerHTML));
			},
			update(el) {
			},
		});
	}

	function formatEmail() {
		function getFormatted(email) {
			return `mailto:${email}`;
		}

		vueApp.directive('format-email', {
			mounted(el) {
				el.setAttribute('href', getFormatted(el.innerHTML));
			},
			update(el) {
			},
		});
	}

	function breakIntoLetters() {
		function getBreak(text) {
			return text.split('').map((letter) => {
				return `<span class="letter">${letter.trim() === '' ? '&nbsp;' : letter}</span>`;
			}).join('');
		}

		vueApp.directive('break-into-letters', {
			mounted(el) {
				el.innerHTML = getBreak(el.innerHTML);
			},
			update(el) {
			},
		});
	}

	function nativeScrollProgress() {
		let options;
		let element;

		function scrollHandler(event) {
			const scroll = event?.target[options.modifiers.horizontal ? 'scrollLeft' : 'scrollTop'];
			const maxScroll = event?.target[options.modifiers.horizontal ? 'scrollWidth' : 'scrollHeight'];
			options.value(scroll / (maxScroll - (options.modifiers.horizontal ? window?.innerWidth : window?.innerHeight)));
		}

		function eventHandler(event) {
			return scrollHandler(event);
		}

		function setEventListener() {
			element.removeEventListener('scroll', eventHandler);
			element.addEventListener('scroll', eventHandler);
		}

		function bindDirective(el, opt) {
			if (typeof opt.value !== 'function') {
				return;
			}
			element = el;
			options = opt;
			setEventListener();
		}

		vueApp.directive('scroll-progress', {
			bind: bindDirective,
			update: bindDirective,
			unbind(el) {
				el.removeEventListener('scroll', eventHandler);
			},
		});
	}

	function pointSeeker() {
		function getTemplate(x, y) {
			return `position: [${x}, ${y}],`;
		}

		function drawCircle(x, y) {
			const [r, g, b] = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
			const div = document.createElement('div');
			const duration = 300;

			Object.assign(div.style, {
				position: 'absolute',
				width: '3rem',
				height: '3rem',
				left: x + 'px',
				top: y + 'px',
				outline: `2px solid rgb(${r}, ${g}, ${b})`,
				borderRadius: '50%',
				transitionProperty: 'scale, opacity',
				transitionDuration: `${duration}ms`,
				transitionTimingFunction: 'ease-out',
				translate: '-50% -50%',
				pointerEvents: 'none',
			});

			document.body.appendChild(div);

			setTimeout(() => {
				div.style.scale = 2;
				div.style.opacity = 0;
			});

			setTimeout(() => div.remove(), duration);
		}

		function setListener(el) {
			el.addEventListener('click', (event) => {
				const { left, top, width, height } = el.getBoundingClientRect();
				const x = (((event.x - left) / width) * 100).toFixed(1);
				const y = (((event.y - top) / height) * 100).toFixed(1);

				console.log(`%cPOSITION -> %cx: ${x} y: ${y}`, 'color: #F0073F', 'color: #FF9400');

				const textArea = document.createElement('textarea');

				textArea.value = getTemplate(x, y);
				textArea.style.position = 'absolute';
				textArea.style.left = '-999999px';
				document.body.prepend(textArea);
				textArea.select();

				document.execCommand('copy');
				textArea.remove();

				drawCircle(event.x, event.y);
			});
		}

		vueApp.directive('point-seeker', {
			mounted: setListener,
			update: setListener,
		});
	}

	/** v-intersect="'className'".
	 *  Intersection observer, добавляющий класс, при появлении блока во viewport. */
	intersectingClass();

	/** v-nbsp
	 * Добавить &nbsp для висячих предлогов */
	noLineBreak();

	/** v-format-number
	 * Разделение числа пробелами  */
	formatNumber();

	/** v-strip-tags
	 * Удалить html теги из текста  */
	stripTags();

	/** v-br-break
	 * Разбиение текста по <br /> и замена на <span> ...someText... </span>
	 * Добавляет каждому span инлайновую переменную --i со значением индекса */
	brBreak();

	/** v-format-phone
	 * Добавить элементу <a> аттрибут href с номером */
	formatPhone();

	/** v-format-email
	 * Добавить элементу <a> аттрибут href с email */
	formatEmail();

	/** v-extra-space
	 * +1 пробел между словами */
	extraSpace();

	/** v-break-into-letters
	 * разбить текст на отдельные буквы в <span> */
	breakIntoLetters();

	/** v-scroll-progress
	 * Принимает функцию, в которую передает прогресс ноды от 0 до 1. Имеет модификатор horizontal
	 * <div v-scroll-progress.horizontal="(value) => someFunc(value)"></div>
	 */
	nativeScrollProgress();

	/** v-point-seeker
	 * Пишет в консоль положение клика по ноде от 0 до 100.
	 * Записывает в буффер объект { left: 69.1, top: 13.5 }
	 */
	pointSeeker();
});

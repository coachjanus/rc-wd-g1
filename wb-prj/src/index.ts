// @ts-expect-error Stylesheet imports are handled by the bundler.
import './styles.scss';
// @ts-expect-error Image imports are handled by the bundler.
import logoUrl from './assets/logo.jpg';


const img = document.createElement('img');
img.src = logoUrl;
document.body.appendChild(img);
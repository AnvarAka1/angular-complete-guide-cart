import { Directive, ElementRef, HostListener, Renderer2, HostBinding } from "@angular/core";

@Directive({
	selector: "[appDropdown]"
})
export class DropdownDirective {
	@HostBinding("class.open") isOpen = false;
	@HostListener("click")
	toggleOpen(eventData: Event) {
		this.isOpen = !this.isOpen;
	}
}

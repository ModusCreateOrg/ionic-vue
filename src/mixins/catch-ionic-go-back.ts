import { IonBackButton } from '../types/interfaces';

export default {
  methods: {
    // Catch the bubbled-up event from the Ionic's back button
    catchIonicGoBack(event: Event): void {
      if (!event.target) return;

      // We only care for the event coming from Ionic's back button
      const backButton = (event.target as HTMLElement).closest('ion-back-button') as IonBackButton;
      if (!backButton) return;

      let defaultHref: string;

      // Explicitly override router direction to always trigger a back transition
      this.$router.directionOverride = -1;

      // If we can go back - do so
      if (this.$router.canGoBack()) {
        event.preventDefault();
        this.$router.back();
        return;
      }

      // If there's a default fallback - use it
      defaultHref = backButton.defaultHref;
      if (undefined !== defaultHref) {
        event.preventDefault();
        this.$router.push(defaultHref);
      }
    },
  },
};

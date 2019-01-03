import { NgModule } from '@angular/core'
import { PlaceHolderPipe } from './place-holder/place-holder'
import { FirebaseReversePipe } from './firebase-reverse/firebase-reverse';
@NgModule({
	declarations: [PlaceHolderPipe,
    FirebaseReversePipe],
	imports: [],
	exports: [PlaceHolderPipe,
    FirebaseReversePipe]
})
export class PipesModule {}

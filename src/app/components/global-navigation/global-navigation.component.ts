import { ChangeDetectionStrategy, Component, signal, ViewChild, WritableSignal } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBar, MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { ProgressService } from '../../services/progress.service';

@Component({
    selector: 'app-global-navigation',
    templateUrl: './global-navigation.component.html',
    styleUrl: './global-navigation.component.scss',
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatListModule,
        MatIconModule,
        MatProgressBarModule,
        RouterModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalNavigationComponent {
    @ViewChild('loadingIndicator') loadingIndicator!: MatProgressBar;
    showProgressBar: WritableSignal<boolean> = signal(false);

    constructor(private readonly progressService: ProgressService) { 
    }
    ngAfterViewInit() {
        // listen for changes to the work in progress state and use the progress bar to show user
        this.progressService.getWorkInProgress().subscribe((workInProgress: boolean) => {
            setTimeout(() => this.showProgressBar.set(workInProgress));
        });
    }   
}

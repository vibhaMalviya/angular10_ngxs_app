import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Dispatch } from '@ngxs-labs/dispatch-decorator';
import { GetAllTemplates } from '../../store/app/app.actions';
import { ViewSelectSnapshot } from '@ngxs-labs/select-snapshot';

@Component({
  selector: 'app-template-browser',
  templateUrl: './template-browser.component.html',
  styleUrls: ['./template-browser.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateBrowserComponent implements OnInit {

  @ViewSelectSnapshot(state => state.appState.templates) templatesList: Array<any>;
  constructor(private readonly router: Router ) { }

  ngOnInit(): void {
    if (!this.templatesList?.length) {
      this.getAllTemplates();
    }
  }

  onViewSelect(view) {
    console.log('row selected %o', view);
    this.router.navigate(['/template', view.id], { queryParams: { context: 'adhoc' } });
  }

  openNewAdhocAnalysis() {
    this.router.navigate(['/template', 'default'], { queryParams: { context: 'adhoc' } });
  }

  @Dispatch() getAllTemplates = () => new GetAllTemplates();
}

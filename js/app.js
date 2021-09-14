// Initializer

const sscBusinessSectionLinks = document.querySelectorAll( '#sscBusinessHeaderBottom ul li a' );

const sscBusinessSections = document.querySelectorAll( 'section' );

const sscBusinessCallToAction = document.querySelector( '#sscBusinessHome a' );

const sscBusinessMainFormOpening = document.querySelector( '#sscBusinessMainFormOpener' );

const sscBusinessMainFormClosing = document.querySelector( '#sscBusinessMainFormCloser' );

const sscBusinessMainForm = document.getElementById( 'sscBusinessMainFormContent' );

let sscBusinessClickedButtonToOpenForm;

// Hiding the Loader

window.onload = ( event ) => 
{
    event.preventDefault();
    
    setTimeout( () => 
    {
        document.getElementById( 'sscLoader' ).style.cssText = 'opacity: 0; display: none;';

        const sscBusinessMainSite = document.getElementById( 'sscMainSite' );

        sscBusinessMainSite.style.display = 'block';
        
        setTimeout( () => document.getElementById( 'sscMainSite' ).style.opacity = '1', 50);

    }, 2000);
}

// On Scroll

window.onscroll = ( event ) =>
{
    const sscScrollHeight = window.scrollY;
    
    sscBusinessStickTheMenu( event, sscScrollHeight );

    let index = sscBusinessSections.length;

    const sscBussinessHeaderHeight = document.querySelector( 'header' ).offsetHeight;

    while ( --index && sscScrollHeight + sscBussinessHeaderHeight < sscBusinessSections[index].offsetTop ){}

    sscBusinessSectionLinks.forEach( ( sscBusinessSectionLink ) => sscBusinessSectionLink.classList.remove( 'ssc-active' ));

    if(sscScrollHeight - sscBusinessSections[ index ].offsetHeight < sscBusinessSections[ index ].offsetTop)
    {
        sscBusinessSectionLinks[ index ].classList.add( 'ssc-active' );
    }

}

// Activate the Links

for (const sscBusinessSectionLink of sscBusinessSectionLinks)
{
    sscBusinessSectionLink.addEventListener( 'click', sscBusinessGoTo );
}

sscBusinessCallToAction.addEventListener( 'click', sscBusinessGoTo);

// Main Form Toggle

sscBusinessMainFormOpening.addEventListener( 'click', ( event ) => 
{
    event.preventDefault();

    sscBusinessClickedButtonToOpenForm = event.target.tagName === 'I' ? event.target : event.target.children[0];

    if( sscBusinessMainForm.dataset.state === 'open' )
    {
        setTimeout( () => 
        {
            sscBusinessMainForm.style.transform = 'scaleY(0)';

            setTimeout( () => 
            {
                sscBusinessMainForm.style.display = 'none';

                sscBusinessMainForm.dataset.state = 'close';

                sscBusinessClickedButtonToOpenForm.classList.add( 'ssc-move-vertically' );
            }, 2000 );
        }, 50 );

        return;
    }

    setTimeout( () => 
    {
        sscBusinessMainForm.style.display = 'flex';

        setTimeout( () => 
        {
            sscBusinessMainForm.style.transform = 'scaleY(1)';

            sscBusinessMainForm.dataset.state = 'open';

            sscBusinessClickedButtonToOpenForm.classList.remove( 'ssc-move-vertically' );
        }, 100 );
    }, 50 );

    return;
    
});

sscBusinessMainFormClosing.addEventListener( 'click', ( event ) => 
{
    event.preventDefault();

    setTimeout( () => 
    {
        sscBusinessMainForm.style.transform = 'scaleY(0)';

        setTimeout( () => 
        {
            sscBusinessMainForm.style.display = 'none';

            sscBusinessMainForm.dataset.state = 'close';

            sscBusinessClickedButtonToOpenForm.classList.add( 'ssc-move-vertically' );
        }, 2000 );
    }, 50 );

    return;
    
});

// Will take to the selected section

function sscBusinessGoTo( event )
{
    event.preventDefault();
    
    const sscBusinessActiveLink = document.querySelector( '.ssc-active' );

    if( sscBusinessActiveLink !== this )
    {
        const sscClickedItemsLink = this.getAttribute( 'href' );
        
        const sscBusinessGoToTheOffset = sscClickedItemsLink === '#sscBusinessHome' ? 0 : document.querySelector( sscClickedItemsLink ).offsetTop - document.querySelector('header').offsetHeight;
        
        scroll( {
            top: sscBusinessGoToTheOffset
        } );

        sscToggleActiveClass( this, active );

        sscBusinessStickTheMenu( event, sscBusinessGoToTheOffset );
    }
}

// Toggle Active Class

function sscToggleActiveClass( newActive, oldActive )
{
    newActive.classList.add( 'ssc-active' );

    oldActive.classList.remove( 'ssc-active' );
}

// Sticky Menu

function sscBusinessStickTheMenu( event, scrollHeight = 0 )
{
    const sscBusinessHeaderHeight = document.querySelector( 'header' ).offsetHeight;

    const sscBusinessMenu = document.getElementById( 'sscBusinessHeaderBottom' );

    if( sscBusinessHeaderHeight < scrollHeight )
    {
        sscBusinessMenu.classList.add( 'ssc-sticky-menu-animation' );

        return;
    }

    sscBusinessMenu.classList.remove( 'ssc-sticky-menu-animation' );

    return;
}
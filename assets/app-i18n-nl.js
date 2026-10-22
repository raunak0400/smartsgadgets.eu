/*
 * Dutch texts for third-party widgets that render their own English UI on the Dutch shop.
 * Loaded (synchronously, first thing in <head>) on Dutch pages only. See layout/theme.liquid.
 *
 *  1. Judge.me   - window.jdgmSettings holds every widget text. We translate it while it is being assigned,
 *                  and only when Judge.me itself is still configured for English (settings.locale === 'en').
 *                  Once the Judge.me language is set to Dutch in the app, this override switches itself off.
 *  2. Offerly    - window.__slGiftModalI18n / __slTodayOfferI18n / __slByobI18n (free-gift pop-up, today's offer,
 *                  bundle builder). Translated only while they still hold the English defaults.
 *  3. Rendered text - a few strings that Judge.me/Offerly print straight into the HTML or aria-labels
 *                  ("Customer Reviews", "Write a review", "Based on 5 reviews", histogram labels, ...).
 *
 * Everything is wrapped in try/catch: if anything here fails, the widgets simply stay in English.
 */
(function (w) {
  'use strict';
  if (w.__sgAppI18nNl) return;
  w.__sgAppI18nNl = true;

  var JDGM = {"badge_no_review_text":"Geen beoordelingen","badge_n_reviews_text":"{{ n }} beoordeling/beoordelingen","widget_title":"Klantbeoordelingen","widget_open_form_text":"Schrijf een beoordeling","widget_close_form_text":"Beoordeling annuleren","widget_refresh_page_text":"Pagina vernieuwen","widget_summary_text":"Gebaseerd op {{ number_of_reviews }} beoordeling/beoordelingen","widget_no_review_text":"Schrijf als eerste een beoordeling","widget_name_field_text":"Weergavenaam","widget_verified_name_field_text":"Geverifieerde naam (openbaar)","widget_name_placeholder_text":"Weergavenaam","widget_required_field_error_text":"Dit veld is verplicht.","widget_email_field_text":"E-mailadres","widget_verified_email_field_text":"Geverifieerd e-mailadres (privé, niet te wijzigen)","widget_email_placeholder_text":"Je e-mailadres","widget_email_field_error_text":"Voer een geldig e-mailadres in.","widget_rating_field_text":"Beoordeling","widget_review_title_field_text":"Titel van je beoordeling","widget_review_title_placeholder_text":"Geef je beoordeling een titel","widget_review_body_field_text":"Inhoud van je beoordeling","widget_review_body_placeholder_text":"Begin hier met schrijven...","widget_pictures_field_text":"Foto/video (optioneel)","widget_submit_review_text":"Beoordeling versturen","widget_submit_verified_review_text":"Geverifieerde beoordeling versturen","widget_submit_success_msg_with_auto_publish":"Bedankt! Vernieuw de pagina over enkele ogenblikken om je beoordeling te zien. Je kunt je beoordeling verwijderen of bewerken door in te loggen op <a href='https://judge.me/login' target='_blank' rel='nofollow noopener'>Judge.me</a>","widget_submit_success_msg_no_auto_publish":"Bedankt! Je beoordeling wordt gepubliceerd zodra deze is goedgekeurd door de winkelbeheerder. Je kunt je beoordeling verwijderen of bewerken door in te loggen op <a href='https://judge.me/login' target='_blank' rel='nofollow noopener'>Judge.me</a>","widget_show_default_reviews_out_of_total_text":"{{ n_reviews_shown }} van {{ n_reviews }} beoordelingen weergegeven.","widget_show_all_link_text":"Alles tonen","widget_show_less_link_text":"Minder tonen","widget_author_said_text":"{{ reviewer_name }} zei:","widget_days_text":"{{ n }} dagen geleden","widget_weeks_text":"{{ n }} week/weken geleden","widget_months_text":"{{ n }} maand/maanden geleden","widget_years_text":"{{ n }} jaar/jaar geleden","widget_yesterday_text":"Gisteren","widget_today_text":"Vandaag","widget_replied_text":">> {{ shop_name }} reageerde:","widget_read_more_text":"Meer lezen","widget_rating_filter_see_all_text":"Alle beoordelingen bekijken","widget_sorting_most_recent_text":"Meest recent","widget_sorting_highest_rating_text":"Hoogste beoordeling","widget_sorting_lowest_rating_text":"Laagste beoordeling","widget_sorting_with_pictures_text":"Alleen met foto's","widget_sorting_most_helpful_text":"Meest nuttig","widget_open_question_form_text":"Stel een vraag","widget_reviews_subtab_text":"Beoordelingen","widget_questions_subtab_text":"Vragen","widget_question_label_text":"Vraag","widget_answer_label_text":"Antwoord","widget_question_placeholder_text":"Schrijf hier je vraag","widget_submit_question_text":"Vraag versturen","widget_question_submit_success_text":"Bedankt voor je vraag! We laten het je weten zodra deze beantwoord is.","verified_badge_text":"Geverifieerd","all_reviews_out_of_store_text":"(buiten de winkel)","widget_product_reviews_subtab_text":"Productbeoordelingen","widget_shop_reviews_subtab_text":"Winkelbeoordelingen","widget_other_products_reviews_text":"Beoordelingen van andere producten","widget_store_reviews_subtab_text":"Winkelbeoordelingen","widget_product_variant_reference_text":"Beoordeling voor","widget_no_store_reviews_text":"Deze winkel heeft nog geen beoordelingen ontvangen","widget_web_restriction_product_reviews_text":"Dit product heeft nog geen beoordelingen ontvangen","widget_no_items_text":"Geen items gevonden","widget_show_more_text":"Meer tonen","widget_write_a_store_review_text":"Schrijf een winkelbeoordeling","widget_product_and_store_reviews_text":"Product- en winkelbeoordelingen","widget_reviews_in_collection_text":"Beoordelingen in deze collectie","widget_other_languages_heading":"Beoordelingen in andere talen","widget_translate_review_text":"Vertaal beoordeling naar {{ language }}","widget_translating_review_text":"Vertalen...","widget_show_original_translation_text":"Origineel tonen ({{ language }})","widget_translate_review_failed_text":"De beoordeling kon niet worden vertaald.","widget_translate_review_retry_text":"Opnieuw proberen","widget_translate_review_try_again_later_text":"Probeer het later opnieuw","widget_sorting_pictures_first_text":"Eerst met foto's","floating_tab_title":"Laat klanten voor ons spreken","featured_carousel_title":"Laat klanten voor ons spreken","testimonials_carousel_title":"Wat klanten zeggen","videos_carousel_title":"Echte klantverhalen","cards_carousel_title":"Wat klanten zeggen","featured_carousel_count_text":"van {{ n }} beoordelingen","widget_sorting_videos_first_text":"Eerst met video's","widget_review_pending_text":"In behandeling","preview_badge_no_question_text":"Geen vragen","preview_badge_n_question_text":"{{ number_of_questions }} vraag/vragen","widget_search_bar_placeholder":"Zoeken","widget_sorting_verified_only_text":"Alleen geverifieerd","widget_sorting_most_relevant_text":"Meest relevant","featured_carousel_more_reviews_button_text":"Meer beoordelingen lezen","featured_carousel_view_product_button_text":"Product bekijken","all_reviews_page_load_more_text":"Meer beoordelingen laden","widget_public_name_text":"openbaar weergegeven als","widget_reviewer_anonymous":"Anoniem","medals_widget_title":"Judge.me-beoordelingsmedailles","widget_invalid_yt_video_url_error_text":"Geen geldige YouTube-video-URL","widget_max_length_field_error_text":"Voer maximaal {0} tekens in.","widget_verified_by_shop_text":"Geverifieerd door de winkel","widget_ugc_title":"Door ons gemaakt, door jou gedeeld","widget_ugc_subtitle":"Tag ons om jouw foto op onze pagina te laten verschijnen","widget_ugc_primary_button_text":"Nu kopen","widget_ugc_secondary_button_text":"Meer laden","widget_ugc_reviews_button_text":"Beoordelingen bekijken","widget_summary_average_rating_text":"{{ average_rating }} van de 5","widget_media_grid_title":"Foto's en video's van klanten","widget_media_grid_see_more_text":"Meer bekijken","widget_verified_by_judgeme_text":"Geverifieerd door Judge.me","widget_verified_by_judgeme_text_in_store_medals":"Geverifieerd door Judge.me","widget_media_field_exceed_quantity_message":"Sorry, we kunnen maximaal {{ max_media }} voor één beoordeling accepteren.","widget_media_field_exceed_limit_message":"{{ file_name }} is te groot, kies een bestand ({{ media_type }}) kleiner dan {{ size_limit }} MB.","widget_review_submitted_text":"Beoordeling verstuurd!","widget_question_submitted_text":"Vraag verstuurd!","widget_close_form_text_question":"Annuleren","widget_write_your_answer_here_text":"Schrijf hier je antwoord","widget_collected_by_judgeme_text":"verzameld door Judge.me","widget_load_more_text":"Meer laden","widget_full_review_text":"Volledige beoordeling","widget_read_more_reviews_text":"Meer beoordelingen lezen","widget_read_questions_text":"Vragen lezen","widget_questions_and_answers_text":"Vragen en antwoorden","widget_verified_by_text":"Geverifieerd door","widget_verified_text":"Geverifieerd","widget_number_of_reviews_text":"{{ number_of_reviews }} beoordelingen","widget_back_button_text":"Terug","widget_next_button_text":"Volgende","widget_custom_forms_filter_button":"Filters","widget_gdpr_statement":"Hoe we je gegevens gebruiken: we nemen alleen contact met je op over de beoordeling die je hebt achtergelaten, en alleen als dat nodig is. Door je beoordeling te versturen ga je akkoord met de <a href='https://judge.me/terms' target='_blank' rel='nofollow noopener'>voorwaarden</a>, het <a href='https://judge.me/privacy' target='_blank' rel='nofollow noopener'>privacybeleid</a> en het <a href='https://judge.me/content-policy' target='_blank' rel='nofollow noopener'>contentbeleid</a> van Judge.me.","all_reviews_product_name_prefix_text":"over","widget_ai_summary_title":"Klanten zeggen","widget_ai_summary_disclaimer":"Samengevat en geselecteerd door AI uit recente klantbeoordelingen","store_summary_widget_heading":"Klanten beoordelen deze winkel","store_summary_widget_button_text":"Klantbeoordelingen bekijken","store_summary_widget_button_theme_text":"AI-samenvatting van beoordelingen bekijken","review_content_screen_title_text":"Hoe beoordeel je dit product?","review_content_introduction_text":"We horen graag iets over je ervaring.","store_review_form_title_text":"Hoe beoordeel je deze winkel?","store_review_form_introduction_text":"We horen graag iets over je ervaring.","one_star_review_guidance_text":"Slecht","five_star_review_guidance_text":"Geweldig","customer_information_screen_title_text":"Over jou","customer_information_introduction_text":"Vertel ons iets meer over jezelf.","custom_questions_screen_title_text":"Je ervaring in detail","custom_questions_introduction_text":"Hier zijn een paar vragen om je ervaring beter te begrijpen.","review_submitted_screen_title_text":"Bedankt voor je beoordeling!","review_submitted_screen_thank_you_text":"We verwerken deze en je beoordeling verschijnt binnenkort in de winkel.","review_submitted_screen_email_verification_text":"Bevestig je e-mailadres via de link die we je zojuist hebben gestuurd. Zo houden we beoordelingen authentiek.","confirm_email_screen_title_text":"Bevestig je e-mailadres","confirm_email_screen_message_text":"Om beoordelingen authentiek te houden, sturen we je een beveiligde link om verder te gaan met je beoordeling. Het kost maar een moment.","check_email_screen_title_text":"Controleer je e-mail","check_email_screen_message_text":"We hebben een e-mail gestuurd naar {{ email }}. Klik op de knop in de e-mail om verder te gaan.","check_email_screen_resend_message_text":"E-mail opnieuw verzonden!","check_email_resend_hint_text":"Geen e-mail ontvangen? Controleer je spammap of [verstuur de e-mail opnieuw].","verification_email_rate_limit_error_text":"Je hebt de limiet voor beoordelingspogingen voor dit product bereikt. Controleer je inbox of probeer het later opnieuw.","review_submitted_request_store_review_text":"Wil je je ervaring met winkelen bij ons delen?","review_submitted_review_other_products_text":"Wil je deze producten beoordelen?","store_review_screen_title_text":"Wil je je ervaring met winkelen bij ons delen?","store_review_introduction_text":"We waarderen je feedback en gebruiken die om te verbeteren. Deel gerust je gedachten of suggesties.","reviewer_media_screen_title_picture_text":"Deel een foto","reviewer_media_introduction_picture_text":"Upload een foto om je beoordeling te onderbouwen.","reviewer_media_screen_title_video_text":"Deel een video","reviewer_media_introduction_video_text":"Upload een video om je beoordeling te onderbouwen.","reviewer_media_screen_title_picture_or_video_text":"Deel een foto of video","reviewer_media_introduction_picture_or_video_text":"Upload een foto of video om je beoordeling te onderbouwen.","reviewer_media_youtube_url_text":"Plak hier je YouTube-URL","advanced_settings_next_step_button_text":"Volgende","advanced_settings_close_review_button_text":"Sluiten","write_review_flow_required_text":"Verplicht","write_review_flow_privacy_message_text":"We respecteren je privacy.","write_review_flow_anonymous_text":"Beoordeling anoniem plaatsen","write_review_flow_visibility_text":"Dit is niet zichtbaar voor andere klanten.","write_review_flow_multiple_selection_help_text":"Selecteer er zoveel als je wilt","write_review_flow_single_selection_help_text":"Selecteer één optie","write_review_flow_required_field_error_text":"Dit veld is verplicht","write_review_flow_invalid_email_error_text":"Voer een geldig e-mailadres in","write_review_flow_max_length_error_text":"Max. {{ max_length }} tekens.","write_review_flow_media_upload_text":"<b>Klik om te uploaden</b> of sleep een bestand hierheen","write_review_flow_gdpr_statement":"We nemen alleen contact met je op over je beoordeling als dat nodig is. Door je beoordeling te versturen ga je akkoord met onze <a href='https://judge.me/terms' target='_blank' rel='nofollow noopener'>algemene voorwaarden</a> en ons <a href='https://judge.me/privacy' target='_blank' rel='nofollow noopener'>privacybeleid</a>.","negative_review_resolution_screen_title_text":"Vertel ons meer","negative_review_resolution_text":"Jouw ervaring is belangrijk voor ons. Als er problemen waren met je aankoop, helpen we je graag. Neem gerust contact met ons op, we maken het graag goed.","negative_review_resolution_button_text":"Neem contact op","negative_review_resolution_proceed_with_review_text":"Beoordeling plaatsen","negative_review_resolution_subject":"Probleem met aankoop bij {{ shop_name }}.{{ order_name }}","transparency_badges_collected_via_store_invite_text":"Beoordeling verzameld via uitnodiging van de winkel","transparency_badges_from_another_provider_text":"Beoordeling verzameld via een andere aanbieder","transparency_badges_collected_from_store_visitor_text":"Beoordeling verzameld van een winkelbezoeker","transparency_badges_written_in_google_text":"Beoordeling geschreven op Google","transparency_badges_written_in_etsy_text":"Beoordeling geschreven op Etsy","transparency_badges_written_in_shop_app_text":"Beoordeling geschreven in de Shop-app","transparency_badges_earned_reward_text":"Beoordeling leverde een beloning op voor een volgende aankoop","widget_store_review_label_text":"Beoordeling over de winkel","widget_cart_mode_aggregate_heading_text":"Klanten beoordelen deze winkel","widget_sort_by_text":"Sorteer op","review_widget_voting_label":"Nuttig?","review_widget_shop_reply_label":"Reactie van {{ shop_name }}:","review_widget_filters_title":"Filters","review_widget_filter_rating_title":"Beoordeling","review_widget_filter_keyword_title":"Trefwoord","review_widget_clear_filters_text":"Filters wissen","review_widget_expand_more_text":"Meer","review_widget_review_highlights_title":"Hoogtepunten uit beoordelingen","qna_widget_question_word_singular":"Vraag","qna_widget_question_word_plural":"Vragen","qna_widget_answer_reply_label":"Antwoord van {{ answerer_name }}:","qna_content_screen_title_text":"Stel een vraag over dit product","qna_widget_question_required_field_error_text":"Voer je vraag in.","qna_widget_flow_gdpr_statement":"We nemen alleen contact met je op over je vraag als dat nodig is. Door je vraag te versturen ga je akkoord met onze <a href='https://judge.me/terms' target='_blank' rel='nofollow noopener'>algemene voorwaarden</a> en ons <a href='https://judge.me/privacy' target='_blank' rel='nofollow noopener'>privacybeleid</a>.","qna_widget_question_submitted_text":"Bedankt voor je vraag!","qna_widget_close_form_text_question":"Sluiten","qna_widget_question_submit_success_text":"We laten je per e-mail weten zodra je vraag is beantwoord.","all_reviews_widget_v2025_title":"Klantbeoordelingen","all_reviews_widget_v2025_ai_summary_title":"Klanten zeggen over deze winkel","all_reviews_widget_v2025_no_review_text":"Schrijf als eerste een beoordeling","all_reviews_widget_v2025_review_highlights_title":"Hoogtepunten uit beoordelingen","reviews_grid_widget_header_text":"Van onze klanten"};
  var MODAL = {"ariaLabel":"Melding gratis cadeau","heading":"Gefeliciteerd! 🎉","sub":"Je gratis cadeau is toegevoegd aan je winkelwagen!","viewCart":"Winkelwagen bekijken","continueShopping":"Verder winkelen","close":"Sluiten","giftAlt":"Gratis cadeau"};
  var TODAY = {"catchOffer":"Pak de aanbieding","adding":"Toevoegen...","added":"Toegevoegd aan je winkelwagen.","alreadyQualified":"Je komt al in aanmerking voor deze aanbieding.","spendOffer":"Voeg producten uit de actie toe aan je winkelwagen om deze aanbieding te ontgrendelen.","percentOffer":"Voeg producten uit de actie toe aan je winkelwagen om de korting te krijgen.","unavailable":"Deze aanbieding is op dit moment niet beschikbaar.","addFailed":"Kon niet aan de winkelwagen toevoegen. Probeer het opnieuw."};
  var BYOB = {"added":"%count% toegevoegd","addBundle":"Bundel toevoegen aan winkelwagen","addBundleFor":"Toevoegen aan winkelwagen voor %amount%","adding":"Toevoegen…","add":"Toevoegen","remove":"Verwijderen","increase":"Aantal verhogen","decrease":"Aantal verlagen","seeAll":"Alles bekijken","addedItems":"Toegevoegde artikelen","soldOut":"Uitverkocht","chooseExactly":"Kies %count%","chooseAtLeast":"Kies minimaal %count%","chooseUpTo":"Kies maximaal %count%","needMore":"Kies nog %count% uit “%group%”","groupFull":"Je hebt de limiet voor deze stap bereikt.","addFailed":"Kon niet aan de winkelwagen toevoegen. Probeer het opnieuw.","busy":"Je winkelwagen is bezig. Probeer het zo meteen opnieuw.","unavailable":"Sommige artikelen zijn niet meer beschikbaar. Kies opnieuw.","youSave":"Je bespaart %amount%","close":"Sluiten","loading":"Bundelopties laden…","loadFailed":"Bundelopties konden niet worden geladen. Probeer het opnieuw.","retry":"Probeer opnieuw","cartContents":"Bevat"};

  /* ---- 1 + 2: patch objects at the moment the apps assign them ---------------------------------------- */
  function trap(name, patch) {
    var value;
    try {
      Object.defineProperty(w, name, {
        configurable: true,
        enumerable: true,
        get: function () { return value; },
        set: function (v) { try { value = patch(v); } catch (e) { value = v; } }
      });
    } catch (e) { /* property already locked by something else: leave it alone */ }
  }

  function assignKnown(target, dict) {
    for (var k in dict) {
      if (Object.prototype.hasOwnProperty.call(dict, k) && Object.prototype.hasOwnProperty.call(target, k) && typeof target[k] === 'string') {
        target[k] = dict[k];
      }
    }
    return target;
  }

  trap('jdgmSettings', function (s) {
    return (s && typeof s === 'object' && s.locale === 'en') ? assignKnown(s, JDGM) : s;
  });
  trap('__slGiftModalI18n', function (o) {
    return (o && o.heading === 'Congratulations! 🎉') ? assignKnown(o, MODAL) : o;
  });
  trap('__slTodayOfferI18n', function (o) {
    return (o && o.catchOffer === 'Catch offer') ? assignKnown(o, TODAY) : o;
  });
  trap('__slByobI18n', function (o) {
    return (o && o.addBundle === 'Add bundle to cart') ? assignKnown(o, BYOB) : o;
  });

  /* ---- 3: strings printed straight into the page ------------------------------------------------------- */
  var MEDAL = { Diamond: 'Diamant', Platinum: 'Platina', Gold: 'Goud', Silver: 'Zilver', Bronze: 'Brons' };
  function plural(n, one, many) { return String(n) === '1' ? one : many; }

  var EXACT = {
    'Customer Reviews': 'Klantbeoordelingen',
    'Customer reviews': 'Klantbeoordelingen',
    'Write a review': 'Schrijf een beoordeling',
    'Cancel review': 'Beoordeling annuleren',
    'Be the first to write a review': 'Schrijf als eerste een beoordeling',
    'No reviews': 'Geen beoordelingen',
    'Verified Buyer': 'Geverifieerde koper',
    'You unlocked your free gift!': 'Je hebt je gratis cadeau ontgrendeld!',
    'You unlocked your reward!': 'Je hebt je beloning ontgrendeld!',
    'TODAY OFFER': 'AANBIEDING VANDAAG',
    "View today's offers": 'Bekijk de aanbiedingen van vandaag',
    'Free gift': 'Gratis cadeau'
  };
  var PATTERNS = [
    [/^Based on (\d+) reviews?$/, function (m) { return 'Gebaseerd op ' + m[1] + ' ' + plural(m[1], 'beoordeling', 'beoordelingen'); }],
    [/^(\d+) reviews?$/, function (m) { return m[1] + ' ' + plural(m[1], 'beoordeling', 'beoordelingen'); }],
    [/^(\d+)% \((\d+)\) reviews with (\d) star rating$/, function (m) { return m[1] + '% (' + m[2] + ') beoordelingen met ' + m[3] + ' ' + plural(m[3], 'ster', 'sterren'); }],
    [/^(\d) star reviews?$/, function (m) { return 'Beoordeling met ' + m[1] + ' ' + plural(m[1], 'ster', 'sterren'); }],
    [/^Average rating is ([\d.]+) stars?$/, function (m) { return 'Gemiddelde beoordeling is ' + m[1].replace('.', ',') + ' sterren'; }],
    [/^(Diamond|Platinum|Gold|Silver|Bronze) Transparent Shop\. Published (\d+)% of verified reviews received in total$/,
      function (m) { return MEDAL[m[1]] + ' transparante webshop. ' + m[2] + '% van de ontvangen geverifieerde beoordelingen is gepubliceerd'; }],
    [/^Spend (.+) more to unlock your free gift\.$/, function (m) { return 'Besteed nog ' + m[1] + ' om je gratis cadeau te ontgrendelen.'; }],
    [/^Add (\d+) more to unlock your reward\.$/, function (m) { return 'Voeg nog ' + m[1] + ' toe om je beloning te ontgrendelen.'; }]
  ];

  function translate(str) {
    var t = str.replace(/\s+/g, ' ').trim();
    if (!t || t.length > 170) return null;
    if (EXACT.hasOwnProperty(t)) return EXACT[t];
    for (var i = 0; i < PATTERNS.length; i++) {
      var m = PATTERNS[i][0].exec(t);
      if (m) return PATTERNS[i][1](m);
    }
    return null;
  }

  function fixTextNodes(root) {
    var walker = w.document.createTreeWalker(root, 4 /* NodeFilter.SHOW_TEXT */, null);
    var node, hits = [];
    while ((node = walker.nextNode())) {
      var v = node.nodeValue;
      if (v && v.length < 200 && /[A-Za-z]/.test(v)) hits.push(node);
    }
    for (var i = 0; i < hits.length; i++) {
      var out = translate(hits[i].nodeValue);
      if (out !== null) hits[i].nodeValue = hits[i].nodeValue.replace(hits[i].nodeValue.trim(), out);
    }
  }

  var ATTRS = ['aria-label', 'title', 'alt', 'placeholder'];
  function fixAttributes(root) {
    var list = root.querySelectorAll ? root.querySelectorAll('[aria-label],[title],[alt],[placeholder]') : [];
    var all = [root].concat(Array.prototype.slice.call(list));
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (!el.getAttribute) continue;
      for (var j = 0; j < ATTRS.length; j++) {
        var v = el.getAttribute(ATTRS[j]);
        if (v) { var out = translate(v); if (out !== null) el.setAttribute(ATTRS[j], out); }
      }
    }
  }

  function fix(root) { try { fixTextNodes(root); fixAttributes(root); } catch (e) { /* never break the page */ } }

  var queue = [], timer = null;
  function flush() {
    timer = null;
    var items = queue; queue = [];
    for (var i = 0; i < items.length; i++) if (items[i].isConnected !== false) fix(items[i]);
  }

  function start() {
    var doc = w.document;
    fix(doc.body);
    new w.MutationObserver(function (records) {
      for (var i = 0; i < records.length; i++) {
        var added = records[i].addedNodes;
        for (var j = 0; j < added.length; j++) {
          if (added[j].nodeType === 1) queue.push(added[j]);
          else if (added[j].nodeType === 3 && added[j].parentNode) queue.push(added[j].parentNode);
        }
      }
      if (queue.length && !timer) timer = setTimeout(flush, 60);
    }).observe(doc.body, { childList: true, subtree: true });
  }

  if (w.document.readyState === 'loading') w.document.addEventListener('DOMContentLoaded', start);
  else start();

  // exposed for tests
  w.__sgAppI18nNlApi = { translate: translate, JDGM: JDGM };
})(typeof window !== 'undefined' ? window : this);
